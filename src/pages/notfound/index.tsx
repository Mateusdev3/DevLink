import { Header } from "../../components/Header";
import { Link } from "react-router";

export function NotFound() {
    return(
        <div className="flex flex-col items-center h-screen">
            
            <section className="flex flex-col items-center justify-center h-screen">
                <h1 className="font-bold text-9xl text-white">404</h1>
                <h2 className="font-medium text-7xl text-white">Pagina não encontrada!</h2>
                <Link to={"/"} className="bg-blue-600 rounded-lg h-13 w-11/12 mt-10 text-white font-medium text-xl flex items-center justify-center"> Voltar para Home</Link>
            </section>
        
        </div>
    )

}