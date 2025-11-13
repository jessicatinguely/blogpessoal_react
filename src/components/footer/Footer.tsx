import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";


function Footer(){

    let data = new Date().getFullYear();

    return(
        <>
            <div className="flex justify-center bg-[#FFC8DD] text-[#2A5F9E]">
                < div className = "container flex flex-col items-center py-4" >
                    <p className="text-xl font-bold">
                    Blog Pessoal. Todos os direitos reservados. ©{data} 
                    </p>
                    <p className="text-xl"> Acesse nossas redes sociais</p>
                    <div className="flex gap-2">
                        <LinkedinLogoIcon size={48} weight="bold"  className="text-[#2A5F9E]" />
                        <InstagramLogoIcon size={48}  weight="bold" className="text-[#2A5F9E]" />
                        <FacebookLogoIcon size={48} weight="bold" className="text-[#2A5F9E]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;