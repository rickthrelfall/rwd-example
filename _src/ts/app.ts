// This is just test code to illustrate various toggles etc.

enum LAYOUTS { normal = 1, doubleLeft, doubleRight };
enum THEMES { default = 1, dark, light };

class NavManager {
 
    document: Document;
    nav: HTMLElement;
    layoutCurrent: LAYOUTS = LAYOUTS.normal;
    showFilterView: boolean = false;
    themeCurrent: THEMES = THEMES.default;

    constructor() {}

    public initialise() {
        this.document = document;
        this.nav = this.document.getElementById("nav");

        this.attachClickHandlers();
    }

    public cleanup() {
        this.nav = null;
        this.document = null;

        this.removeClickHandlers();
    }

    private attachClickHandlers() {
        if (this.nav) {
            this.nav.addEventListener( 'click', this.onclickedNav );
        }
    }

    private removeClickHandlers() {
        if (this.nav) {
            this.nav.removeEventListener( 'click', this.onclickedNav );
        }
    }

    onclickedNav: { (event: MouseEvent): void } = (event: MouseEvent) => {
        var clickedElement : HTMLElement = event.target as HTMLElement;

        if (clickedElement.nodeName != "LI") {
            clickedElement = clickedElement.parentNode as HTMLElement;
        }

        if (clickedElement.id.length > 0) {
            this.doNavigation(clickedElement.id);
        }
    }

    private getFakeArticle(postfix: string, items: number, articleClass?: string) {
        let retVal: string = "<article class='panel "+articleClass+"'><div class='fake-content__"+postfix+"'>";
        
        for (let i = 0; i < items; i++) {
            retVal += "<div class='fake-item'>"+postfix+i.toString()+"</div>";
        }

        retVal += "</div></article>";

        return (retVal);
    }

    private doNavigation(id: string) {
        let articles : HTMLElement = this.document.getElementById("articleContainer");
        let themeTarget : HTMLElement = this.document.getElementById("themeTarget");

        if (id === "navOne") {
            articles.innerHTML = 
            this.getFakeArticle("A", 5)+
            "";
        } else if (id === "navTwo") {
            articles.innerHTML = 
            this.getFakeArticle("A", 3)+
            this.getFakeArticle("B", 2)+
            "";   
        } else if (id === "navThree") {
            articles.innerHTML = 
            this.getFakeArticle("A", 1, "full-width")+
            this.getFakeArticle("B", 4, "full-width")+
            this.getFakeArticle("C", 3)+
            "";  
        } else if (id === "navFour") {
            articles.innerHTML = 
            this.getFakeArticle("A", 4)+
            this.getFakeArticle("B", 5)+
            this.getFakeArticle("C", 3)+
            this.getFakeArticle("D", 1)+
            "";    
        } else if (id === "navFive") {
            articles.innerHTML = 
            this.getFakeArticle("A", 3)+
            this.getFakeArticle("B", 5)+
            this.getFakeArticle("C", 4)+
            this.getFakeArticle("D", 2)+
            this.getFakeArticle("E", 1, "full-width")+
            "";
        } else if (id === "navToggle") {
            articles.classList.remove("double-left");
            articles.classList.remove("double-right");

            switch (this.layoutCurrent) {
                case LAYOUTS.normal:
                    articles.classList.add("double-left");
                    this.layoutCurrent = LAYOUTS.doubleLeft;
                    break;
                case LAYOUTS.doubleLeft:
                    articles.classList.add("double-right");
                    this.layoutCurrent = LAYOUTS.doubleRight;
                    break;
                case LAYOUTS.doubleRight:
                    this.layoutCurrent = LAYOUTS.normal;
                    break;
            }           

        } else if (id === "navFilter") {
            this.showFilterView = !this.showFilterView;
            if (this.showFilterView) {
                articles.classList.add("filter-view");
            } else {
                articles.classList.remove("filter-view");
            }
            
        } else if (id === "navTheme") {
            themeTarget.classList.remove("theme-default");
            themeTarget.classList.remove("m-theme-dark");
            themeTarget.classList.remove("m-theme-light");

            switch (this.themeCurrent) {
                case THEMES.default:
                    themeTarget.classList.add("m-theme-dark");
                    this.themeCurrent = THEMES.dark;
                    break;
                case THEMES.dark:
                    themeTarget.classList.add("m-theme-light");
                    this.themeCurrent = THEMES.light;
                    break;
                case THEMES.light:
                    themeTarget.classList.add("theme-default");
                    this.themeCurrent = THEMES.default;
                    break;
            }     
        } else {
            articles.innerHTML = 
            "<article class='panel'><div class='fake-content__A'>A</div></article>"+
            "";            
        }
    }

}

class LayoutApp {
    navManager: NavManager;

    // Construction
    constructor() {
        try {
            this.initialise();
        }
        catch(e) {
 //           this.cleanup();
            console.log(e);
        }
        finally {
            // 
        }
    }

    // Initialise the application
    private initialise() {
        this.navManager = new NavManager();
        if (this.navManager) {
            this.navManager.initialise();
        }
    }

    // Cleanup on initialise failure
    private cleanup() {
        if (this.navManager) {
            this.navManager.cleanup();
            this.navManager = null;
        }
    }

}

// Application instance
new LayoutApp();
