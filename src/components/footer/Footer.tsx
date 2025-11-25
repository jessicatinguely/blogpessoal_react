import {GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";


function Footer(){

    let data = new Date().getFullYear();

    const {usuario} = useContext(AuthContext);

    let component: ReactNode

    if (usuario.token !== "") {
        component = (
            <div className="flex justify-center bg-[#FFC8DD] text-[#2A5F9E]">
                < div className = "container flex flex-col items-center py-4" >
                    <p className="text-xl font-bold">
                    Blog Pessoal. Todos os direitos reservados. ©{data} 
                    </p>
                    <p className="text-xl"> Acesse nossas redes sociais</p>
                    <div className="flex gap-2">
                        <a href="https://www.linkedin.com/in/jessicatinguely/"target="_blank">
                        <LinkedinLogoIcon size={48} weight="thin"  className="text-[#2A5F9E]" />
                        </a>
                        <a href="https://www.instagram.com/jessicatinguely/"target="_blank">
                        <InstagramLogoIcon size={48}  weight="thin" className="text-[#2A5F9E]" />
                        </a>
                        <a href="https://github.com/jessicatinguely"target="_blank">
                        <GithubLogoIcon size={48} weight="thin" className="text-[#2A5F9E]" />
                        </a>
                    </div>
                    </div>
            </div>
        )
    }

    return(
        <>
             { component }
        </>
    )
}

export default Footer;