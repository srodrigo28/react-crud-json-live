import "./style.css";
export function Login(){
    return(
        <>
            <div class="area-login-background d-none d-md-block"></div>

            <div class="area-form">
                <form class="w-100">
                    <h1 class="titulo">Crud Users</h1>
                    <h2 class="subtitulo">Mais eficiência no controle de usuários</h2>
                    
                    <input class="input-form form-control w-100" type="text" placeholder="digite seu nome" />
                    
                    <div class="group-btn d-flex gap-3 justify-content-center">
                        <button class="btn btn-outline-primary mobile">Entrar</button>
                        <button class="btn btn-outline-success mobile">Registar</button>
                    </div>
                </form>
                <p class="footer"> <span>copy 2024</span> | Desenvolvendo <span>Seb App</span> </p>
            </div>
        </>
    )
}