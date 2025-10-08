import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

interface PrivateProps {
    children: React.ReactNode;
}
export function Private({ children }: PrivateProps): any {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const usub = onAuthStateChanged(auth, (user) => {

            if (user) {

                const userData = {
                    uid: user.uid,
                    email: user.email,
                };

                localStorage.setItem("@ReacLinks", JSON.stringify(userData));
                setLoading(false);
                setSigned(true);

            } else {

                console.log("Não possui usuário logado");
                localStorage.removeItem("@ReacLinks");
                setLoading(false);
                setSigned(false);
            }

            return () => usub();
        });
    }, []);

    if (loading) {
        return <div className="text-amber-50 text-3xl flex justify-center text-center items-center h-screen">Carregando...</div>;
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children;
   
}
