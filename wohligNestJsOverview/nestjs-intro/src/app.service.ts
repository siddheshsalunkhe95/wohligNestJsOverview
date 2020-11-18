import { Injectable } from '@nestjs/common';

/*
  all logical part includes here 
*/
@Injectable()
export class AppService {
  /* 
    description: displays greet msg.  
  */
  greetingMsg(): any {
    let getHoursValue = new Date().getHours();
    let greetMsg = "";

    if (getHoursValue < 12) {
      greetMsg = "Good Morning";
    } else if (getHoursValue > 12 && getHoursValue < 16) {
      greetMsg = "Good Afternoon";
    } else {
      greetMsg = "Good Evening";
    }

    return {
      name: `Hello ${greetMsg} Welcome To Wohlig Transformation.`
    };
  }


  /* 
    description: validateQueryString as a number.
  */
  validateQueryString(
    idValue: any
  ): any {
    return { name: `Welcome To Wohlig Transformation And Query Params Is: ${idValue}` };
  }


  /* 
    description: validateUuidString as a number.
  */
  validateUuidString(
    uuidVal: any
  ): any {
    return { name: `Welcome To Wohlig Transformation And Uuid Is: ${uuidVal}` };
  }

  /* 
    description: nest js guards concept
  */
  guardsExample(): any {
    return {
      name: `Hello Welcome To Wohlig Transformation This Is Guards Example.`
    };
  }
}
