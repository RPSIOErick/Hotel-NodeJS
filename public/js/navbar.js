const menu_trigger = document.getElementById("menu-trigger");
const navbar_body = document.getElementById("navbar-body")

window.onload = () =>
{
    menu_trigger.src = "../../img/navbar/hambuger.png";
}
menu_trigger.onclick = () =>
{
    /*Abre e fecha a Navbar*/
        
    
        if(navbar_body.style.display === "none")
        {
            menu_trigger.src = "../../img/navbar/btn-fechar.png";
            navbar_body.style.display = "block"
        }
        else
        {
            navbar_body.style.display = "none"
            menu_trigger.src = "../../img/navbar/hambuger.png";
        }

};

