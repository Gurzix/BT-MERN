const router = require("express").Router();
const path = require("path");
const User = require("../models/User");
const UserVerification = require("../models/UserVerification");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const bcrypt = require("bcrypt");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Gotowy do wysyłania maili");
    console.log(success);
  }
});
// register admin user

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const foundUser = await User.findOne({ username: req.body.username });
    foundUser && res.status(400).json("Nazwa jest już zajęta");

    const foundEmail = await User.findOne({ email: req.body.email });
    foundEmail && res.status(400).json("Email znajduje się już w bazie");

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      subscription: false,
      subscription_expiration: null,
      verified: false,
    });
    const user = await newUser.save().then((result) => {
      sendVerificationEmail(result, res);
      console.log("udało sie");
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// send email

const sendVerificationEmail = ({ _id, email }, res) => {
  const currentUrl = "http://localhost:5000/";
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_USER,
    to: email,
    subject: "Zweryfikuj swój email",
    html: `<p>Zweryfikuj swój email aby móc w pełni korzystać z naszej biblioteki ćwiczeń</p><p>Ten link <b>wygasa za 5 godzin</b></p><p>Kliknij <a href=${
      currentUrl + "api/auth/verify/" + _id + "/" + uniqueString
    }>tutaj</a>, aby kontynuować.</p>`,
  };

  // hash unique string

  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      // set values in user verification collection in mongoDB
      const newVerification = new UserVerification({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000,
      });

      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //email sent and verification record saved
              console.log("jest ok");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch(() =>
      res.json({
        status: "FAILED",
        message: "An error occured when hashing email data",
      })
    );
};

//verify email
router.get("/verify/:userId/:uniqueString", (req, res) => {
  let { userId, uniqueString } = req.params;
  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        //user verification record exists so we proceed

        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;
        if (expiresAt < Date.now()) {
          // record has expired so we delete it
          UserVerification.deleteOne({ userId })
            .then((result) => {
              User.deleteOne({ _id: userId })
                .then(() => {
                  let message =
                    "Link weryfikacyjny wygasł lub został już użyty";
                  res.redirect(
                    `api/auth/verified/error=true&message=${message}`
                  );
                })
                .catch((error) => {
                  console.log(error);
                  let message = "Coś poszło nie tak";
                  res.redirect(
                    `api/auth/verified/error=true&message=${message}`
                  );
                });
            })
            .catch((error) => {
              console.log(error);
              let message = "Wystąpił błąd ";
              res.redirect(`api/auth/verified/error=true&message=${message}`);
            });
        } else {
          // valid record exists so we validate the user string

          //first compare the hashed unique string

          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                //string matchs
                User.findOneAndUpdate({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.findOneAndDelete({ userId })
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, "./../views/verified.html")
                        );
                        console.log("zweryfikowano użytkownika i chuuuj");
                      })
                      .catch((err) => {
                        console.log(err);
                        let message =
                          "An error occured while deleting user verification record";
                        res.redirect(
                          `api/auth/verified/error=true&message=${message}`
                        );
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    let message =
                      "An error occured while comparing updating user";
                    res.redirect(
                      `api/auth/verified/error=true&message=${message}`
                    );
                  });
              } else {
                //record exists but incorrect verification details passed
                let message =
                  "Podano błędne dane, sprawdź swój link atywacyjny na poczcie}";
                res.redirect(`api/auth/verified/error=true&message=${message}`);
              }
            })
            .catch((err) => {
              console.log(err);
              let message = "An error occured while comparing unique strings";
              res.redirect(`api/auth/verified/error=true&message=${message}`);
            });
        }
      } else {
        let message = "Link weryfikacyjny wygasł lub został już użyty";
        res.redirect(`api/auth/verified/error=true&message=${message}`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = "coś poszło nie tak";
      res.redirect(`api/auth/verified/error=true&message=${message}`);
    });
});

//verified page route

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verified.html"));
});

//  login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    !user && res.status(400).json("Użytkownik nie istnieje");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Hasło nieprawidłowe!");
    const { password, ...others } = user._doc;
    if (user.verified === true) {
      if (
        user.subscription === true &&
        Date.parse(user.subscription_expiration.toISOString().slice(0, 10)) <
          Date.parse(new Date().toISOString().slice(0, 10))
      ) {
        const changeuserSub = await User.findByIdAndUpdate(user._id, {
          $set: { subscription: false },
        });
        console.log(user._id);
        user.subscription = false;
      }
      res.status(200).json(others);
    } else {
      res.status(401).json("musisz zweryfikować konto");
    }
  } catch (err) {
    console.log(err);
  }
});

// get user

router.post("/user", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");
    console.log(user);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user 2

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Coś poszło nie tak!");
  }
});

//forgot password route

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json("Użytkownik nie istnieje");
    }
    console.log(oldUser.username);
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/api/auth/reset-password/${oldUser._id}/${token}`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    let mailOptions = {
      from: process.env.AUTH_USER,
      to: oldUser.email,
      subject: "Zmiana hasła",
      html: `<p>Kliknij <a href=${link}>tutaj</a>, aby kontynuować zmianę hasła. W przeciwnym razie pomiń tego maila.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch {}
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json("Użytkownik nie istnieje");
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email });
  } catch {
    res.send("not verified");
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json("Użytkownik nie istnieje");
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.render("passwordChanged", { email: verify.email });
  } catch {
    res.send("not verified");
  }
});

router.post("/contact", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const message = req.body.message;
  const phone = req.body.phone;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    let mailOptions = {
      from: name / email,
      to: process.env.AUTH_USER,
      subject: `Wiadomość od ${name} - formularz`,
      html: `<p>${message}. Mój email to ${email}, nr telefonu do kontaktu - ${phone}.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch {}
});

module.exports = router;
