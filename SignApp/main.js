// import { protocol } from 'electron';

// console.log('testing.......')

const{app, BrowserWindow, Menu, window} = require('electron')
const {ipcRenderer} = require('electron')
const path = require('path')
const url = require('url')
require('electron-reload')(__dirname)
let win

console.log(__dirname)

function createWindow() {
    win = new BrowserWindow({width:1500, height:1000})

    win.loadURL(url.format({
        // pathname: path.join(__dirname, 'main.html'),
        pathname: path.join(__dirname, '/webplatform/index.html'),
        // pathname: path.join(__dirname, '/moban600/index.html'),
        protocol: 'file',
        slashes:true
 
    }))

    win.on('closed', ()=>{
        win = null
    })
    
    // win.openDevTools()    
}

    
function createLoginWindow(){
    console.log('adsfadsf')

    var login_register = new BrowserWindow({ width: 800, height: 600 });
    login_register.webContents.on('did-finish-load', ()=>{
        login_register.show();
        login_register.focus();
      });
      login_register.loadURL('file://' + __dirname +'/login-sign-up-form-concept/index.html');

}

app.on('ready', function(){
    createWindow()
    const template = [
        {
            label: 'demo',
            submenu: [{
                label: 'submenu1',
                click: function(){
                    console.log('clicked!')
                    createLoginWindow()
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'submenu2',
                click: function(){
                    console.log('clicked2!')
                }
            }]
        },
        {
            label: 'view',
            submenu:[
                {
                    label: 'view1'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'view2'
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)



})

app.on('window-all-closed', () =>{
    console.log("quit....")
    app.quit()
    // if(process.platform !== 'darwin'){
    //     app.quit()
    // }
})

app.on('activate', () => {
    if(win === null){
        createWindow()
    }    
})


