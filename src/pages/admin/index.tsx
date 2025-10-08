import { useEffect, useState } from "react";
import { Header } from "../../components/Header"
import { Input } from "../../components/input";
import { BiTrash } from "react-icons/bi";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc  } from "firebase/firestore";

export function Admin() {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [bg, setBg] = useState("#121212");
    const [color, setColor] = useState("#fff");

    const [links, setLinks] = useState<LinkProps[]>([])

    interface LinkProps {
        id: string;
        bg: string;
        color: string;
        created: string;
        name: string;
        url: string;
    }
        
    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
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
            
        });
        return () => unsub();
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (name ==="" || url === "") {
            alert("Preencha todos os campos!");
            return;
        }

            addDoc(collection(db,"links"),{
                name: name,
                url: url,
                bg: bg,
                color: color,
                created: new Date()
        })
        .then(() =>{
            console.log("Link cadastrado com sucesso!");
        })
        .catch((error) =>{
            console.log("Erro ao cadastrar link: " + error);
        })
        setName("");
        setUrl("");
    }
    function handleDelete(id: string){
        deleteDoc(doc(db, "links", id))
        .then(() => {
            console.log("Link deletado com sucesso!");
        })
        .catch((error) => {
            console.log("Erro ao deletar link: " + error);
        })
    }
  
    return (

        <div className="flex itens-center flex-col min-h-screen pb-7 px-2 w-full ">
            <Header />

            <form onSubmit={handleSubmit} className="flex flex-col mt-20 mb-3 items-center w-full">
                <label className="text-white mt-2 mb-2 font-medium">Nome do link </label>
                <Input placeholder="Digite o nome do link..."
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <label className="text-white mt-2 mb-2 font-medium"> Url do link </label>
                <Input placeholder="Digite a url..."
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} />

                <section className="flex gap-6 mt-4">
                    <div>
                        <label className="text-white mt-2 mb-2 font-medium"> Fundo do link </label>
                        <input type="color"
                            value={bg}
                            onChange={(e) => setBg(e.target.value)} />
                    </div>

                    <div>
                        <label className="text-white mt-2 mb-2 font-medium"> Cor do link </label>
                        <input type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)} />
                    </div>
                </section>
                {name !== "" && (
                    <div className="flex flex-col mt-8 w-full max-w-xl items-center  border-1 rounded-lg p-5 border-white px-4">
                        <label className="text-white font-medium mb-2 mt-2">Veja como está ficando</label>
                        <article className="font-medium w-full h-9 flex items-center justify-center rounded-lg mb-2 mt-2 transition-transform hover:scale-105 " style={{ backgroundColor: bg, color: color }}>
                            <p>
                                {name}
                            </p>
                        </article>
                    </div>
                )}
                <button type="submit" className="bg-blue-600 text-white font-medium h-9 w-11/12 max-w-xl rounded-lg mt-8 flex items-center justify-center select-none">Cadastrar</button>
            </form>

            {links.length > 0 && (
                 <h2 className="font-bold text-white text-center mt-2 mb-4 text-2xl">Meus links</h2>
            )}
                    
           {links.map((item) => (
        
            <div className="flex items-center justify-center" >
                 <article key={item.id} className="font-medium text-white flex items-center justify-between max-w-xl w-11/12 rounded-lg h-12 mb-2 px-2 mt-2"
                 style={{backgroundColor: item.bg, color: item.color}}>
                <p>
                    {item.name}
                </p>
                <div>
                    <button className="cursor-pointer" onClick={() => handleDelete(item.id)}>
                        <BiTrash size={29} color="#FFF" className=" border border-dashed p-1 mt-1 "/>
                    </button>
                </div>
            </article>
            </div>
          
           ))}

        
           
        </div>
        
    )
    
}