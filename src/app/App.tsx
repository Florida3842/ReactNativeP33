import AppContent from "./ui/AppContent";
import AppStyle from "./ui/AppStyle";
import AppContentStyle from "./ui/AppContentStyle";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App(){
    
    return <SafeAreaProvider>
        <SafeAreaView edges={['top', 'bottom']} style={AppStyle.safeArea}>
            <AppContent />
        </SafeAreaView>
        
    </SafeAreaProvider>
}

