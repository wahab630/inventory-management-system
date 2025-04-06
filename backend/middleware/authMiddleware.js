// custom middleware // ye guard ha card nai to yahi se wapis jao
import jwt from "jsonwebtoken";
import "dotenv/config";
//authentication pahla honi chahiya tabhi req ma user ayega or phir us se role nikalenga
export const isAuthenticatedUser = (req, res, next) => {//no arguments normal objects as args
  try {
    // const { token } = req.s("token"); //hr req k obj ma cookie ka obj b aye ga many tokens destructure kr lia
  const token = req.cookies.token; // get time cookies
       console.log(token);
  if (!token) {  // agr jwt set nai ha to user ne login nai kia
    return next(
      new Error("please login to access this resource")
    );
  }
  //global error handling ma jwt ko pakar kr dekh le kis form ma ata ha
  // token to ara ha but wo expire ha or expire ka check ni lagaya wa
  const { payload } = jwt.verify(token, process.env.JWT_SECRET); // ye user ki id de dega// ye library apna andr se hi expiry ka error deta ha jo postman pr work krta ha but UI pr nai UI pr khud krna parta ha
  req.user = payload;// hr user k lia login ki info alag alag hogi 100 users ki info use b save rakhna ha
  // login k bad user ka obj req ma dala hi is lia taka globally access kr sake user ko req obj se
  next(); // jaha se control aya tha wahi wapis bhej dia yani route ma agla controller pr
  // next ka middleware // req res cycle ko complete kia
  } catch (error) {
    next(error)// express next middleware se error catch kr k saree errors global error handling middleware ma bheje jo server ma end pr define ha
  }
};

export const authorizedUser = (...roles) => {// 3no strings as array store hongi rest operator ma// ye custom fn ha
  return (req, res, next) => {//fn return kr re kyunka res req next b chahiya or in k sath koi arg pass ni kr sakte kyunka warna wo error ban jaega// ab ye express ka middleware ha
    if (!roles.includes(req.user.role)) {// roles array pr include ka fn true ya false return karega
      return next(// req ka obj globally available ha poora backend ma
        new Error(`Role ${req.user.role} is not allowed to access this resource `)    //   
      );
    }
    next();// agr role exist krta ha to allowed to execute next middleware in the qeue
  };
};