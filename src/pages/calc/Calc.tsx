import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import { useState } from "react";
import { CalcOperations } from "./model/CalcOperations";
import { MemoryButtonTypes } from "./model/MemoryButtonTypes";
import MemoryButton from "./ui/MemoryButton";


const maxDigits = 20;
const dotSymbol = ",";
const minusSymbol = "\u2212";
const groupSeparator = "\u2009";

interface ICalcState {
    expression: string,
    result: string,
    isNeedClear: boolean,
    operation?: CalcOperations,
    prevArgument?: number,
    isNeedClearEntry: boolean,
};

const initCalcState:ICalcState = {
    expression: "",
    result: "0",
    isNeedClear: true,
    isNeedClearEntry: false,
}

export default function Calc() {
    const [calcState, setCalcState] = useState<ICalcState>(initCalcState);

    // врахування конфігурації: поворот екрану (орієнтація пристрою)
    const {width, height} = useWindowDimensions();

     const countDigits = (res: string): number => {
        return res.replace(/\D/g, '').length;
    };

    const normalize = (res: string): string => {
        return res
            .replaceAll(groupSeparator, '')
            .replace(dotSymbol, '.')
            .replace(minusSymbol, '-');
    };

    const formatResult = (res: string): string => {
        let sign = '';
        if(res.startsWith(minusSymbol)) {
            sign = minusSymbol;
            res = res.substring(1);
        }

        let [intPart, fracPart] = res.split(dotSymbol);

        intPart = intPart.replaceAll(groupSeparator, '');

        let formattedInt = '';
        for(let i = 0; i < intPart.length; i++) {
            let pos = intPart.length - i;
            formattedInt += intPart[i];
            if(pos > 1 && pos % 3 === 1) {
                formattedInt += groupSeparator;
            }
        }

        return sign + formattedInt + (fracPart ? dotSymbol + fracPart : '');
    };


    // #region Functions
    const equalClick = () => {
        if(!calcState.operation) return;
        setCalcState({...calcState,
            result: numToRes(
                calcState.operation == CalcOperations.add ? calcState.prevArgument! + resToNum(calcState.result)
              : calcState.operation == CalcOperations.sub ? calcState.prevArgument! - resToNum(calcState.result)
              : calcState.operation == CalcOperations.mul ? calcState.prevArgument! * resToNum(calcState.result)
              : calcState.operation == CalcOperations.div ? calcState.prevArgument! / resToNum(calcState.result)
              : NaN
            ),
            expression: `${calcState.expression} ${calcState.result} =`,
            operation: undefined,
            prevArgument: undefined,
            isNeedClear: true,
        });
    };
 
    const operButtonClick = (oper:CalcOperations, symbol:string) => {
        setCalcState({...calcState,
            operation: oper,
            expression: `${calcState.result} ${symbol}`,
            prevArgument: resToNum(calcState.result),
            isNeedClearEntry: true,
        })
    };
    
    const resToNum = (res:string):number => { 
        return Number(normalize(res));
    };

    const numToRes = (num:number):string => {
        return formatResult(
            num.toString()
                .replace('.', dotSymbol)
                .replace('-', minusSymbol)
        );
    };

    const invClick = () => {
        let arg = resToNum(calcState.result);
        arg = 1.0 / arg;
        setCalcState({...calcState,
            result: numToRes(arg),
            expression: `1 / ${calcState.result} =`,
            isNeedClear: true
        });
    };

    const digitClick = (text:string) => {
        let res = calcState.result;

        if(res == '0' || calcState.isNeedClear || calcState.isNeedClearEntry) {
            res = '';
        }

        if(countDigits(res) < maxDigits) {
            res += text;
            res = formatResult(res);
        }

        setCalcState({...calcState,
            result: res,
            expression: calcState.isNeedClear ? "" : calcState.expression,
            isNeedClear: false,
            isNeedClearEntry: false,
        });
    };

    const clearClick = () => {
        setCalcState(initCalcState);
    };

    const clearEntryClick = () => {
       setCalcState({...calcState,
            result: "0",
       });
    };

    const backspaceClick = () => {
        let raw = normalize(calcState.result);

        let len = raw.length;
        let res = len > 1 ? raw.substring(0, len - 1) : "0";

        if(res == '-') res = '0';

        res = res
            .replace('.', dotSymbol)
            .replace('-', minusSymbol);

        setCalcState({...calcState,
            result: formatResult(res),
        });
    };

    const dotClick = (text:string) => {
        if(!calcState.result.includes(text)) {
            let res = calcState.isNeedClear || calcState.isNeedClearEntry
                ? "0" + text
                : calcState.result + text;

            setCalcState({...calcState,
                result: formatResult(res),
                expression: calcState.isNeedClear ? "" : calcState.expression,
                isNeedClear: false,
                isNeedClearEntry: false,
            });
        }
    };

    const pmClick = () => {
        if(calcState.result == '0') return;

        let raw = normalize(calcState.result);

        raw = raw.startsWith('-')
            ? raw.substring(1)
            : '-' + raw;

        raw = raw
            .replace('.', dotSymbol)
            .replace('-', minusSymbol);

        setCalcState({...calcState,
            result: formatResult(raw),
        });
    };

    const squareClick = () => {
        let arg = resToNum(calcState.result);
        let res = arg * arg;

        setCalcState({...calcState,
            result: numToRes(res),
            expression: `${calcState.result}² =`,
            isNeedClear: true
        });
    };

    const sqrtClick = () => {
        let arg = resToNum(calcState.result);

        if(arg < 0) {
            setCalcState({...calcState,
                result: "0",
                expression: `√(${calcState.result}) = Error`,
                isNeedClear: true
            });
            return;
        }

        let res = Math.sqrt(arg);

        setCalcState({...calcState,
            result: numToRes(res),
            expression: `√(${calcState.result}) =`,
            isNeedClear: true
        });
    };
    
    const resultFontSize = calcState.result.length <= 11 ? 60.0 : 660.0 / calcState.result.length;

    const PortraitView = () => <View style={CalcStyle.pageContainer}>
        <View style={CalcStyle.display}>
            <Text style={CalcStyle.pageTitle}>Calculator</Text>
            <Text style={CalcStyle.expression}>{calcState.expression}</Text>
            <Text style={[CalcStyle.result, {fontSize: resultFontSize}]}>{calcState.result}</Text>
        </View>    

        <View style={CalcStyle.keyboard}>
            <View style={CalcStyle.memoryRow}>
                <MemoryButton text="MC" type={MemoryButtonTypes.disabled} />
                <MemoryButton text="MR" type={MemoryButtonTypes.disabled} />
                <MemoryButton text="M+" />
                <MemoryButton text="M-" />
                <MemoryButton text="MS" />
                <MemoryButton text="Mv" type={MemoryButtonTypes.disabled} />
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="%" onPress={() => console.log("Press")}/>
                <CalcButton text="CE" onPress={clearEntryClick} />
                <CalcButton text="C" onPress={clearClick} />
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00b9/\u2093"} onPress={invClick}/>
                <CalcButton text={"x\u00b2"} onPress={squareClick} />
                <CalcButton text={"\u221Ax"} onPress={sqrtClick} />
                <CalcButton text={"\u00F7"} onPress={(face) => operButtonClick(CalcOperations.div, face)} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} onPress={(face) => operButtonClick(CalcOperations.mul, face)}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u2212"} onPress={(face) => operButtonClick(CalcOperations.sub, face)} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\uFF0B"} onPress={(face) => operButtonClick(CalcOperations.add, face)}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u207a\u2215\u208b"} buttonType={CalcButtonTypes.digit} onPress={pmClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick}/>
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>; 

    const LandscapeView = () => <View style={CalcStyle.pageContainer}>
        <View style={CalcStyle.displayLand}>
            <View style={CalcStyle.displayLeftLand}>
                <Text style={CalcStyle.pageTitle}>Calculator</Text>
                <Text style={CalcStyle.expression}>{calcState.expression}{Math.cos(1)}</Text>
                <View style={CalcStyle.memoryRow}>
                    <MemoryButton text="MC" type={MemoryButtonTypes.disabled} />
                    <MemoryButton text="MR" type={MemoryButtonTypes.disabled} />
                    <MemoryButton text="M+" />
                    <MemoryButton text="M-" />
                    <MemoryButton text="MS" />
                    <MemoryButton text="Mv" type={MemoryButtonTypes.disabled} />
                </View>
            </View>
            <Text style={[CalcStyle.resultLand, {fontSize: resultFontSize}]}>{calcState.result}</Text>
        </View>

        <View style={CalcStyle.keyboardLand}>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text="%" onPress={() => console.log("Press")}/>
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00F7"} onPress={(face) => operButtonClick(CalcOperations.div, face)} />
                <CalcButton text="C" onPress={clearClick} />
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text={"\u00b9/\u2093"} onPress={invClick}/>
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} onPress={(face) => operButtonClick(CalcOperations.mul, face)}/>
                <CalcButton text="CE" onPress={clearEntryClick} />
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text={"x\u00b2"} onPress={squareClick} />
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u2212"} onPress={(face) => operButtonClick(CalcOperations.sub, face)} />
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text={"\u221Ax"} onPress={sqrtClick} />
                <CalcButton text={"\u207a\u2215\u208b"} buttonType={CalcButtonTypes.digit} onPress={pmClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick}/>
                <CalcButton text={"\uFF0B"} onPress={(face) => operButtonClick(CalcOperations.add, face)}/>
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>;



    return width < height ? PortraitView() : LandscapeView();
}