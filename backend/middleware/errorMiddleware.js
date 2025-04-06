export const errorMiddleware =(err, req, res, next) => {
    // custom middleware
    let error = { ...err };
    error.message = err.message; // apna object ma dal dia taka mutate na ho
    //error apna name set kr k aye ga
    // console.log(err.name);// check kr lia
    if (err.name == "ValidationError") {
      // agr ye error name ki property ma ha to
      const message = Object.values(err.errors).map((value) => value.message); //object.values se jo array of objects values objects hi ha milaga us pr loop chala di saree messages bahir a jaega
      error = new Error(message); // error ma assign kr dia
    }
    // handle mongoose Duplicate key error
    if (err.code == 11000) {
     
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new Error(message); // error ma assign kr dia
    }
    // wrong mongoose Object ID Error//zaat ka error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
    }
    if(err.name === "JsonWebTokenError"){//agr token expire na ho koi or abnormal error a jae to jwt khud ye error name set karegi
      const message = 'Json Web token is invalid , try again'
      error = new Error(message);
    }
    if(err.name === "TokenExpiredError"){
      const message = 'Json Web token is Expired , try again'
      error = new Error(message);
    }
    res.json({//jb error ayega to yaha se wapis bhejunga sirf message 200 ki success request k sath// kyunka api ne kuch na kuch data laya ha beshak wo data error ki form ma laya
      // ye error handling middleware ha to tabhi chalega jab error ayega 
      //but hum ne show krna ha green ya red box ma success ya error abi sirf redux ki state ma ara ha error
      success:false,// ye differentiate krna k lia flag ha k jb b error aye to success false
      message: error.message,//yani error pr b message hi aye ga
    });
  }