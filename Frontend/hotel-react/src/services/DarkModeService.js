
class DarkModeService{

    setDarkMode(){
        if(localStorage.getItem('mode')==="light"){
            document.documentElement.style.setProperty( '--backgroundColor', 'var(--backgroundColorDark)' ); 
            document.documentElement.style.setProperty( '--backgroundHeader', 'var(--backgroundHeaderDark)' ); 
            document.documentElement.style.setProperty( '--colorFont', 'var(--colorFontDark)' ); 
            document.documentElement.style.setProperty( '--boxshadow', 'var(--boxshadowDark)' ); 
            document.documentElement.style.setProperty( '--backgroundBoxcardColor', 'var(--backgroundBoxcardColorDark)' ); 
            document.documentElement.style.setProperty( '--backgroundTableChildren', 'var(--backgroundTableChildrenDark)' ); 
            document.documentElement.style.setProperty( '--backgroundTableTRHover', 'var(--backgroundTableTRHoverDark)' ); 
            document.documentElement.style.setProperty( '--textshadow', 'var(--textshadowDark)' ); 
            document.documentElement.style.setProperty( '--borderTable', 'var(--borderTableDark)' ); 
            document.documentElement.style.setProperty( '--boxshadowButton', 'var(--boxshadowButtonDark)' ); 
            localStorage.setItem("mode", "dark");
            return localStorage.setItem("mode", "dark");
          }
          else{
            document.documentElement.style.setProperty( '--backgroundColor', 'var(--backgroundColorLight)' ); 
            document.documentElement.style.setProperty( '--backgroundHeader', 'var(--backgroundHeaderLight)' ); 
            document.documentElement.style.setProperty( '--colorFont', 'var(--colorFontLight)' ); 
            document.documentElement.style.setProperty( '--boxshadow', 'var(--boxshadowLight)' ); 
            document.documentElement.style.setProperty( '--backgroundBoxcardColor', 'var(--backgroundBoxcardColorLight)' ); 
            document.documentElement.style.setProperty( '--backgroundTableChildren', 'var(--backgroundTableChildrenLight)' ); 
            document.documentElement.style.setProperty( '--backgroundTableTRHover', 'var(--backgroundTableTRHoverLight)' ); 
            document.documentElement.style.setProperty( '--textshadow', 'var(--textshadowLight)' ); 
            document.documentElement.style.setProperty( '--borderTable', 'var(--borderTableLight)' ); 
            document.documentElement.style.setProperty( '--boxshadowButton', 'var(--boxshadowButtonLight)' );
            localStorage.setItem("mode", "light");
            return localStorage.setItem("mode", "light");
          }
    }

    getDarkMode(){
        return localStorage.getItem("mode");
    }

    addDarkMode(){
        document.documentElement.style.setProperty( '--backgroundColor', 'var(--backgroundColorDark)' ); 
        document.documentElement.style.setProperty( '--backgroundHeader', 'var(--backgroundHeaderDark)' ); 
        document.documentElement.style.setProperty( '--colorFont', 'var(--colorFontDark)' ); 
        document.documentElement.style.setProperty( '--boxshadow', 'var(--boxshadowDark)' ); 
        document.documentElement.style.setProperty( '--backgroundBoxcardColor', 'var(--backgroundBoxcardColorDark)' ); 
        document.documentElement.style.setProperty( '--backgroundTableChildren', 'var(--backgroundTableChildrenDark)' ); 
        document.documentElement.style.setProperty( '--backgroundTableTRHover', 'var(--backgroundTableTRHoverDark)' ); 
        document.documentElement.style.setProperty( '--textshadow', 'var(--textshadowDark)' ); 
        document.documentElement.style.setProperty( '--borderTable', 'var(--borderTableDark)' ); 
        document.documentElement.style.setProperty( '--boxshadowButton', 'var(--boxshadowButtonDark)' ); 
    }

 	
 }
export default new DarkModeService();