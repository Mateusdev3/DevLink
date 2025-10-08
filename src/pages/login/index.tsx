import { Input } from "../../components/input";
import React, { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function handleSubmit(event: React.FormEvent){
        event.preventDefault();

        if (email === "" || password === ""){
            alert("Preencha todos os campos");
            return;
        }

       signInWithEmailAndPassword(auth,email, password)
       .then(() => {
       navigate("/admin",({replace:true}));
       })
       .catch(() => {
        alert("Erro ao fazer login");
       });

    }
    return(
        <div className="flex items-center justify-center w-full h-screen flex-col gap-4">
            <h1 className="text-white mt-11 mb-7 font-bold text-5xl">Dev
                <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>

                <form className="width-full max-w-xl flex flex-col w-full px-4" onSubmit={handleSubmit}>

                    <Input type="email" placeholder="Insira seu e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>


                     <Input type="password" placeholder="Insira sua senha..."
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}/>

                     <button className="bg-blue-500 text-amber-50 font-bold h-9 rounded-md cursor-pointer">Acessar</button>
                </form>
        </div>
    )
}