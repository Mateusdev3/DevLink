import { Link } from "react-router";

export function NotFound() {
    return(
        <div className="flex flex-col items-center h-screen">
         
            <section className="flex flex-col items-center justify-center h-screen">
                <h1 className="md:text-9xl text-8xl font-bold text-white mb-2">404</h1>
                <h2 className="md:text-5xl text-2xl font-medium text-white">Pagina não encontrada!</h2>
                <Link to={"/"} className="bg-blue-600 rounded-lg h-13 w-11/12 mt-10 text-white font-medium text-xl flex items-center justify-center cursor-pointer"> Voltar para Home</Link>
            </section>
        
        </div>
    )

}