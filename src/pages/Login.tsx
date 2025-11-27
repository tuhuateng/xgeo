import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/services/auth";
import { Sparkles, Globe, MessageCircle } from "lucide-react";
import { useState } from "react";

const Login = () => {
    // const [isSmsLogin, setIsSmsLogin] = useState(false);
    // const [phone, setPhone] = useState("");
    // const [code, setCode] = useState("");
    // const [countdown, setCountdown] = useState(0);

    // const handleLogin = () => {
    //     auth.login();
    // };

    // const handleSendCode = async () => {
    //     if (!phone) return;
    //     try {
    //         await auth.sendSmsCode(phone);
    //         setCountdown(60);
    //         const timer = setInterval(() => {
    //             setCountdown((prev) => {
    //                 if (prev <= 1) {
    //                     clearInterval(timer);
    //                     return 0;
    //                 }
    //                 return prev - 1;
    //             });
    //         }, 1000);
    //     } catch (error) {
    //         alert("发送失败，请稍后重试");
    //     }
    // };

    // const handleSmsLogin = async () => {
    //     if (!phone || !code) return;
    //     try {
    //         await auth.loginWithSms(phone, code);
    //     } catch (error) {
    //         alert("登录失败，验证码错误或已过期");
    //     }
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl" />
            </div>

            <Card className="w-full max-w-md relative z-10 border-2 shadow-xl">
                <CardHeader className="text-center space-y-2 pb-2">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">欢迎使用 XGEO</CardTitle>
                    <CardDescription>
                        生成式引擎优化 (GEO) 智能分析平台
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-4">
                        <div className="space-y-2 text-sm text-muted-foreground text-center">
                            <p>全方位监测品牌在 AI 时代的表现</p>
                            <div className="flex justify-center gap-4 py-2">
                                <div className="flex items-center gap-1">
                                    <Globe className="w-3 h-3" /> 全球视野
                                </div>
                                <div className="flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> 智能分析
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-11 text-base bg-gradient-primary hover:opacity-90 transition-opacity"
                            onClick={() => auth.loginWithWechat()}
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            使用微信登录
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full h-11 text-base mt-2 hover:bg-muted"
                        onClick={() => auth.loginAsGuest()}
                    >
                        不登录试用
                    </Button>

                    <p className="text-xs text-center text-muted-foreground pt-4">
                        登录即代表您同意我们的服务条款和隐私政策
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
