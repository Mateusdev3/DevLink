import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";


export function Networks() {

    const [facebook, setFacebook] = useState("");
    const [instagran, setInstagran] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
        function loadLinks() {

            const docRef = doc(db, "social", "link");
            getDoc(docRef).then((snapshot) => {

                if (snapshot.data !== undefined) {
                    setFacebook(snapshot.data()?.facebook);
                    setInstagran(snapshot.data()?.instagran);
                    setYoutube(snapshot.data()?.youtube);
                }
            })
                .then(() => {
                    console.log("Dados carregados com sucesso!");
                })
                .catch((error) => {
                    console.log("Erro ao carregar os dados, tente novamente mais tarde!");
                    console.log("Erro ao carregar" + error);
                })
        }
        loadLinks();
    }, []);

    function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagran: instagran,
            youtube: youtube
        }).then(() => {
            console.log("Redes sociais cadastradas com sucesso!");
        }).catch((error) => {
            console.log("Erro ao cadastrar, tente novamente mais tarde!");
            console.log("Erro ao cadastrar" + error);
        })

    }

    return (
        <div className="flex flex-col items-center h-screen">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8">Minhas redes sociais</h1>

            <form className="flex flex-col mt-10 w-full px-2 max-w-xl" onSubmit={handleRegister}>

                <label className="text-white font-medium mb-2 px-2">Link do Facebook</label>
                <Input placeholder="Insira a url do seu Facebook..." type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mb-2 px-2">Link do Instagran</label>
                <Input placeholder="Insira a url do seu Instagran..." type="url"
                    value={instagran}
                    onChange={(e) => setInstagran(e.target.value)}
                />

                <label className="text-white font-medium mb-2 px-2">Link do Youtube</label>
                <Input placeholder="Insira a url do seu Youtube..." type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button className="bg-blue-600 h-9 rounded-lg text-white font-medium mt-9 select-none cursor-pointer">Cadastrar</button>

            </form>

        </div>
    )
}