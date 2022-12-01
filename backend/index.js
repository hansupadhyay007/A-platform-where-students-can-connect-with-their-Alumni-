const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mailer = require("nodemailer");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
const app = express();

// cors

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// mongoose connect to database

mongoose.connect(
  `mongodb+srv://subhranshu:subhranshu@cluster0.zxwok9x.mongodb.net/?retryWrites=true&w=majority`
);

// express session

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  })
);

// initialize passport

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  name: String,
  username: String, // username : The mail ID of the user or student.
  password: String,
  collegeName: String,
  joiningYear: String,
  passingYear: String,
  isAlumni: Boolean,
  branch: String,
  rollNo: String,
  phone: String,
  messages: [
    {
      sender: String,
      message: String,
      timestamp: String,
      isAlumni: Boolean,
    },
  ],
  videos: [
    {
      video_title: String,
      video_url: String,
    },
  ],
  meets: [
    {
      schedule: String,
      student_name: String,
      meet_url: String,
      student_phone: String,
    },
  ],
  reward: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("user", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); // for login and register the user.
passport.deserializeUser(User.deserializeUser()); // for logging out the user.

// routes
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, response: "success." });
});

// register the user / student.

app.post("/register-user", (req, res) => {
  console.log("-->   Register user called");
  // register the user using passportJS
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, u) => {
      if (err) {
        console.log(err);
        res
          .status(404)
          .json({ status: 404, response: "may user already exist." });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.status(200).json({
            status: 200,
            username: req.user.username,
            response: "user created successfully.",
          });
        });
      }
    }
  );
});

// login with user credentials

app.post("/login-user", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      res.status(404).json({
        status: 404,
        response: "error in logging in the user.",
      });
    } else {
      passport.authenticate("local")(req, res, () => {
        res.status(200).json({
          status: 200,
          isAuthenticated: true,
        });
      });
    }
  });
});



app.post("/register-user-details", (req, res) => {
  console.log(req.body.isalumni);
  if (true) {
    User.updateOne(
      {
        username: req.body.username, // we will get the data from the user as the user is already registered.
      },
      {
        $set: {
          name: req.body.name,
          collegeName: req.body.collegename,
          joiningYear: req.body.joiningyear,
          passingYear: req.body.passingyear,
          branch: req.body.branch,
          rollNo: req.body.rollno,
          phone: req.body.phone,
          isAlumni: req.body.isalumni,

          // more filed should add
        },
      },
      (err) => {
        if (err) {
          res.status(404).json({ status: 404 });
        } else {
          res.status(200).json({
            status: 200,
            response: "user updated successfully.",
          });
        }
      }
    );
  } else {
    res.status(401).json({
      // res.redirect --> if you want to redirect the user.
      status: 401,
      response: "authentication failed.",
    });
  }
});



// verify the student with college database.

app.post("/verify-student", (req, res) => {

  res.send({
    isVerified:true
  });

  // res.send({
  //   isVerified:true
  // })
  // const rollNo = req.body.rollno;
  // const collegeName = req.body.collegename;
  // const name = req.body.name;
  // const year = req.body.year;

  // console.log(name + " " + " " + rollNo + " " + year);

  // switch (collegeName) {
  //   case "SOA":
  //     collegeDBurl = `http://saat.soa.ac.in/${year}/score-card-print.php?APPLNO=${rollNo}`;
  //     break;

  //   default: // for now we have only access to soa student database.
  //     collegeDBurl = `http://saat.soa.ac.in/${year}/score-card-print.php?APPLNO=${rollNo}`;
  //     break;
  // }

  const VerifyDetails = async () => {
    // res.send({
    //   isVerified:true
    // });
    try {
      const { data } = await axios.get(
        `http://saat.soa.ac.in/${year}/score-card-print.php?APPLNO=${rollNo}`
      );
      const $ = cheerio.load(data);
      const userName = $("tr:nth-of-type(1) td.col:nth-of-type(1)").text().trim().split("NAME OF THE CANDIDATE :")[1].trim().toUpperCase();

      console.log(userName);

      if (name.toUpperCase() === userName) {
        res.send({
          userInput: name,
          userName: userName,
          isVerified: true,
        });
      } else {
        res.send({
          userInput: name,
          userName: userName,
          isVerified: false,
        });
      }
    } catch (error) {
      console.log(error);
      // res.send(error);
    }
  };
  // VerifyDetails(); By default i turned it off..
});

// chatting feature

app.post("/user-chat", (req, res) => {
  if (true) {
    console.log("USER-CHAT CALLED");
    const message = req.body.message;
    const sender = req.body.sender;
    const alumni_name = req.body.alumni_name;
    const isAlumni = req.body.isalumni;
    const timestamp = req.body.timestamp;
    console.log(alumni_name + " " + isAlumni);

    User.updateOne(
      { username: alumni_name },
      {
        $push: {
          messages: {
            sender: sender,
            timestamp: timestamp,
            message: message,
            isAlumni: isAlumni,
          },
        },
      },
      (err) => {
        if (err) {
          res
            .status(404)
            .json({ status: 404, response: "error in sending message." });
        } else {
          res
            .status(200)
            .json({ status: 200, response: "message successfully sent." });
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

// get all the users from the database.

app.get("/users", (req, res) => {
  if (true) {
    User.find((err, user) => {
      if (err) {
        res.status(500).json({
          status: 500,
          response: "error in searching users. (DB error)!",
        });
      } else {
        res.send(user);
      }
    });
  } else {
    res.status(401).json({ status: 401, response: "authentication failed." });
  }
});

// specific user

app.get("/users/:username", (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

// upload user favorite videos

app.post("/user-videos", (req, res) => {
  // The alumni should authenticate to send the video links.
  // form: video url, title
  if (req.body.isalumni) {
    User.updateOne(
      { username: req.body.username },
      {
        $push: {
          videos: { video_url: req.body.videourl, video_title: req.body.title },
        },
      },
      (err) => {
        if (err) {
          res
            .status(404)
            .json({ status: 404, response: "error in posting your video." });
        } else {
          res.status(200).json({
            status: 200,
            response: "your video has been posted successfully",
          });
        }
      }
    );
  } else {
    res.status(401).json({
      status: 401,
      response: "You are not a alumni, unauthorized entry.",
    });
  }
});

app.post("/video-chat", (req, res) => {
  const receiver = req.body.receiver;
  const sender = req.body.sender;
  const meet_url = req.body.meeturl;
  const schedule = req.body.schedule;
  const sender_mail = req.body.sender_mail;
  const sender_phone = req.body.sender_phone;
  const subject = `Alumni Video Meet: ${schedule}`;
  const message = `<center><h2>Alumni-Student MEET</h2><br><br><b>STUDENT NAME: </b>${sender}<br><br><b>MEET URL: </b>${meet_url}<br><br><b>SCHEDULE :</b> ${schedule}<br><br><b>STUDENT PHONE: </b> ${sender_phone}<br><br><b>STUDENT MAIL: </b> ${sender_mail}</center>`;

  User.updateOne(
    { username: receiver },
    {
      $push: {
        meets: {
          schedule: schedule,
          student_name: sender,
          meet_url: meet_url,
          student_phone: sender_phone,
        },
      },
    },
    (err) => {
      if (err) {
        res
          .status(404)
          .json({ status: 404, response: "error in sending message." });
      } else {
        try {
          sendMail(receiver, message, subject);
          sendMail(sender_mail, message, subject);
        } catch (error) {
          console.log(error);
        }

        res
          .status(200)
          .json({ status: 200, response: "message successfully sent." });
      }
    }
  );
});

// reward system for alumni
// for every 5 messages alumni will get 1 point, for each google meet the alumni will get 2 points and for one video he/she will get 1 point.

app.post("/alumni-reward", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      const reward =
        parseInt(user.messages.length / 5) +
        user.meets.length * 2 +
        user.videos.length;
      res.status(200).json({
        reward: reward,
      });
    } else {
      res.status(404).json({
        rating: 0,
        star: 0,
        username: "not found.",
      });
    }
  });
});





// send mail notification to users

smtpProtocol = mailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/send-mail", (req, res) => {
  const Email = req.body.email; // mail id of the user.
  const Message = req.body.message;
  const Subject = req.body.subject;
  try {
    sendMail(Email, Message, Subject);
  } catch (error) {
    res.status(404).json({
      status: 404,
      response: "error in sending mail.",
    });
  }
  res.status(200).json({
    status: 200,
    response: "mail successfully sent.",
  });
});

const sendMail = (email, message, subject) => {
  // nodemailer
  let mailOption = {
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    html: message,
  };
  smtpProtocol.sendMail(mailOption, function (err, response) {
    if (err) {
      console.log(err);
      return 404;
    }
    console.log("Message Sent.");
    return 200;
  });
  smtpProtocol.close();
};

// Other requests .. Kindly Ignore

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server active on PORT ${PORT}`);
});
