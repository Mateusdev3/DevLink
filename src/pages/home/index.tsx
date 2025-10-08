
import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5"
import { Social } from "../../components/social"
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export function Home() {
    const [facebook, setFacebook] = useState("");
    const [instagran, setInstagran] = useState("");
    const [youtube, setYoutube] = useState("");
    const [links, setLinks] = useState <LinkProps[]>([])

    interface LinkProps {
        id: string;
        bg: string;
        color: string;
        created: string;
        name: string;
        url: string;
    }
    useEffect(() => {

        function loadLinks(){
            const docRefs = collection(db, "links");
            getDocs(docRefs).then((snapshot) => {
                let lista = [] as LinkProps[];
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        bg: doc.data().bg,
                        color: doc.data().color,
                        created: doc.data().created,
                        name: doc.data().name,
                        url: doc.data().url
                    })    

                })
                setLinks(lista);
            }
                ).catch((error) => {
                    console.log("Erro ao carregar os links" + error);
            } )
        }
        loadLinks();


        function loadSocialinks() {
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
        loadSocialinks();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full py-4  ">
            <h1 className=" text-4xl font-bold text-white mt-20">Mateus | Dev Links</h1>
            <span className="text-gray-50 mb-5 mt-3 font-medium"> Veja meus links 👇🏻</span>

            <main className="flex flex-col mt-20 w-11/12 max-w-lg text-center">
                {links.map((item: any) => (
                    <section className=" mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer font-medium"
                    style={{backgroundColor: item.bg, color: item.color}} >
                    <a >
                        <p className="text-base md:text-lg">
                            {item.name}
                        </p>
                    </a>
                </section> 
                ))}
                <footer className="flex items-center gap-2 text-3xl justify-center mt-8" >
                    <Social url={facebook}> <IoLogoFacebook size={35} color="#fff" /></Social>

                    <Social url={instagran}> <IoLogoInstagram size={35} color="#fff" /></Social>

                    <Social url={youtube}> <IoLogoYoutube size={35} color="#fff" /></Social>
                </footer>

            </main>
        </div>
    )
}