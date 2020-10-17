const router = require("koa-router")();
const {
  userLogin,
  userRegister,
  checkRegisteredByEmail,
  checkRegisteredByPhone,
} = require("../service/users");
const user = require("../service/users");

// user登录响应
router.get("/login", async (req, res) => {
  var name = req.query.userName;
  var pwd = req.query.userPwd;
  console.log("后台接收：name" + name);
  console.log("后台接受：pwd" + pwd);
  // await处理异步任务results，根据不同results情况向前台返回不同响应
  let results = await userLogin(name, pwd);
  if (results.length == 1) {
    console.log("登陆成功");
    req.body = "登陆成功！";
  } else {
    console.log("登陆失败");
    req.body = "登陆失败！请重新登陆！";
  }
});

// user注册响应
router.get("/register", async (req, res) => {
  var name = req.query.userName;
  var pwd = req.query.userPwd;
  var userPhone = req.query.userPhone;
  var userEmail = req.query.userEmail;
  // 验证用户是否已经注册过（userEmail）
  let results1 = await checkRegisteredByEmail(userEmail);
  let results2 = await checkRegisteredByPhone(userPhone);
  if (results1.length == 0 && results2.length == 0) {
    // 新用户——注册
    let registerResults = await userRegister(name, pwd, userPhone, userEmail);
    console.log("注册results："+registerResults.affectedRows);
    if (registerResults.affectedRows == 1) {
      req.body = "注册成功";
    } else {
      req.body = "注册失败！请再尝试一下吧~";
    }
  } else {
    if (results1.length == 1) {
      // email已经注册过
      console.log("该email已注册");
      req.body = "此邮箱已经注册！";
    } else if (results2.length == 1) {
      // phone已经注册过
      console.log("该手机号已经注册");
      req.body = "此手机号已经注册！";
    }
  }
});

module.exports = router;
