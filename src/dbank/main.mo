import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  //currentValue := 300;
  stable var startTime = Time.now();
  //let id = 200;

  //Debug.print("Hello ");
  // Debug.print(debug_show(currentValue));
  // Debug.print(debug_show(id));

  // Private function, only available within this canister  
  // func topUp() {
  //   currentValue += 1;
  //   Debug.print(debug_show(currentValue));
  // };

  public func topUp(value: Float) {
    currentValue += value;
    Debug.print(debug_show(currentValue));
  }; 

  public func withdraw(value: Float) {
    let temp : Float = currentValue - value;
    if (temp >= 0) {
      currentValue -= value;  
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("You done fucked up");
    }
    
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let timeElapsedS : Int = ( Time.now() - startTime ) / 1000000000;

    currentValue := currentValue * ( 1.01 ** Float.fromInt(timeElapsedS) );
    startTime := Time.now();
     
  };
  //topUp();
}