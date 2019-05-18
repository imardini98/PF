import CONSTANTS from '../utils/constants'
class Tools {
    convertToHertz= function (value_slider){
        switch(value_slider){
            case "000":
            return 0
            case "001":
            return 9
            case "010":
            return 18
            case "011":
            return 27
            case "100":
            return 36
            case "101":
            return 45
            case "110":
            return 54
            case "111":
            return 60
        }
    }
    convertToBits = function (value){
        switch(value){
            case 0:
            return  {
                DIN1:0,
                DIN2:0,
                DIN3:0,
            }
            case 9:
            return  {
                DIN1:1,
                DIN2:0,
                DIN3:0,
            }
            case 18:
            return  {
                DIN1:0,
                DIN2:1,
                DIN3:0,
            }
            case 27:
            return  {
                DIN1:1,
                DIN2:1,
                DIN3:0,
            }
            case 36:
            return  {
                DIN1:0,
                DIN2:0,
                DIN3:1,
            }
            case 45:
            return  {
                DIN1:1,
                DIN2:0,
                DIN3:1,
            }
            case 54:
            return  {
                DIN1:0,
                DIN2:1,
                DIN3:1,
            }
            case 60:
            return  {
                DIN1:1,
                DIN2:1,
                DIN3:1,
            }
        }
    }
}
export default new Tools()