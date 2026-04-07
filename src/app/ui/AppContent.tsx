import { Text, TouchableOpacity, View, Image, BackHandler } from "react-native";
import AppContentStyle from "./AppContentStyle";
import Home from "../../pages/home/Home";
import IRoute from "../../features/model/IRoute";
import { useEffect, useState } from "react";
import Calc from "../../pages/calc/Calc";
import NotFound from "../../pages/notFound/NotFound";


const startPage:IRoute = {
    slug: 'home',
};


export default function App() {
    const [history, setHistory] = useState<Array<IRoute>>([]);
    const [page, setPage] = useState<IRoute>(startPage);

     const navigate = (route:IRoute):void => {
        if(route.slug == "-1") {
            if(history.length > 0) {
                const prevPage = history.pop();
                setPage(prevPage!);
                setHistory(history);
            }
            else {
                BackHandler.exitApp();
            }
        }
        else if(route.slug != page.slug) {
            setHistory([...history, page]);
            setPage(route);
        }
        
    };

    useEffect(() => {
        console.log(history);
        const handler = BackHandler.addEventListener(
            'hardwareBackPress', () => {
                // console.log("back press");
                navigate({slug: '-1'});
                return true;
            });
        return () => handler.remove();    
    }, [history]);


    return <View style={AppContentStyle.container}>
        <View style={AppContentStyle.topBar}>
            <View style={AppContentStyle.topBarIcon}></View>
            <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
            <View style={AppContentStyle.topBarIcon}></View>
        </View>

        <View style={AppContentStyle.pageWidget}>

            { page.slug == "home"  ? <Home />
            : page.slug == "calc"  ? <Calc />
            : <NotFound />
            }
        </View>

        <View style={AppContentStyle.bottomBar}>
            <TouchableOpacity onPress={() => navigate({slug: 'home'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../../features/asset/home.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({slug: 'calc'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../../features/asset/calc.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({slug: 'menu'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../../features/asset/menu.png')}/>
            </TouchableOpacity>
            <View style={AppContentStyle.bottomBarIcon}></View>
            <View style={AppContentStyle.bottomBarIcon}></View>
        </View>

    </View>
    
}