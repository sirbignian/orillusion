<<<<<<< HEAD
// <<<<<<< Updated upstream
// import { Sample_GraphicPath } from "./graphic/Sample_GraphicPath"
// =======
import { Sample_GraphicPath } from "./graphic/Sample_GraphicPath"
import { Sample_GraphicPath2 } from "./graphic/Sample_GraphicPath2";
import { Sample_GraphicPath3 } from "./graphic/Sample_GraphicPath3";
import { Sample_GraphicShape } from "./graphic/Sample_GraphicShape";
// >>>>>>> Stashed changes

=======
>>>>>>> 033c95aa2b1fc6c68ec72d13ce2c53017fdc0d79
/******** Load all samples in /src/sample/ ********/
// {
//     // find all demos in /sample
//     const modules = import.meta.glob(['./*/*.ts', '!./*/_*.ts'])
//     // create menu
//     let title = '', list = `<svg onclick="document.body.classList.remove('show')" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="close"><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>`
//     for (const path in modules) {
//         if (!path.includes('Sample_')) continue
//         const arr = path.split('/')
//         const _title = arr[1]
//         const _demo = arr[2].replace(/Sample_|\.ts/g, '')
//         if (_title != title) {
//             list += `<p>${_title}</p>`
//             title = _title
//         }
//         list += `<a id="${path}">${_demo}</a>`
//     }
//     const menu = document.createElement('div')
//     menu.className = 'menu'
//     menu.innerHTML = list
//     document.body.appendChild(menu)

<<<<<<< HEAD

//     // change sessionStorage.target on click, and reload iframe
//     menu.addEventListener('click', (e: Event) => {
//         const button = e.target as HTMLElement
//         if (!button.id)
//             return
//         // remove prev iframe to clear memory
//         document.querySelector('iframe')?.remove()
//         const target = button.id
//         if (target && modules[target]) {
//             addIframe()
//             document.querySelector('.active')?.classList.remove('active')
//             button.classList.add('active')
//             sessionStorage.top = menu.scrollTop
//             sessionStorage.target = target
//         }
//     })
=======
    // change sessionStorage.target on click, and reload iframe
    menu.addEventListener('click', (e: Event) => {
        const button = e.target as HTMLElement
        if (!button.id)
            return
        // remove prev iframe to clear memory
        document.querySelector('iframe')?.remove()
        const target = button.id
        if (target && modules[target]) {
            addIframe()
            document.querySelector('.active')?.classList.remove('active')
            button.classList.add('active')
            sessionStorage.top = menu.scrollTop
            sessionStorage.target = target
        }
    })
>>>>>>> 033c95aa2b1fc6c68ec72d13ce2c53017fdc0d79

//     // load target on refresh
//     if (sessionStorage.target) {
//         const target = sessionStorage.target
//         const a = document.querySelector(`[id="${target}"]`)
//         if (a) {
//             addIframe()
//             a.classList.add('active')
//             menu.scrollTop = sessionStorage.top
//         }
//     } else {
//         document.querySelector('a')?.click()
//     }

<<<<<<< HEAD
//     // create an iframe inside page to load sample
//     function addIframe() {
//         const iframe = document.createElement('iframe') as HTMLIFrameElement
//         iframe.srcdoc = `
//         <style>html,body{margin:0;padding:0;overflow:hidden}canvas{touch-action:none}</style>
//         <script>
//             let target = sessionStorage.target
//             if(target)
//             import('./samples/'+target).then(m=>{
//                 for(let i in m){
//                     new m[i]().run()
//                     break
//                 }
//             })
//         </script>`
//         document.body.appendChild(iframe)
//     }
// }

// import { Sample_GraphicMesh_Trailing } from "./graphic/Sample_GraphicMesh_Trailing";
// new Sample_GraphicMesh_Trailing().run();

// <<<<<<< Updated upstream
// new Sample_GraphicPath().run();
// =======
// new Sample_GraphicPath().run();
// new Sample_GraphicPath2().run();
// new Sample_GraphicPath3().run();
new Sample_GraphicShape().run();
// >>>>>>> Stashed changes
=======
    // create an iframe inside page to load sample
    function addIframe() {
        const iframe = document.createElement('iframe') as HTMLIFrameElement
        iframe.srcdoc = `
        <style>html,body{margin:0;padding:0;overflow:hidden}canvas{touch-action:none}</style>
        <script>
            let target = sessionStorage.target
            if(target)
            import('./samples/'+target).then(m=>{
                for(let i in m){
                    new m[i]().run()
                    break
                }
            })
        </script>`
        document.body.appendChild(iframe)
    }
}
>>>>>>> 033c95aa2b1fc6c68ec72d13ce2c53017fdc0d79
