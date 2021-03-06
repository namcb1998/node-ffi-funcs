const FFI = require('ffi-napi')
const path = require('path')
// https://docs.microsoft.com/en-us/windows/win32/api
let user32 = new FFI.Library('user32.dll', {
    'GetDesktopWindow': ['pointer', []],
    'FindWindowW': ['pointer', ['string', 'string']],
    'FindWindowExW': ['pointer', ['pointer', 'pointer', 'string', 'string']],
    'IsWindowVisible': ['bool', ['pointer']],
    'SetForegroundWindow': ['bool', ['pointer']],
    'GetParent': ['pointer', ['pointer']],
    'GetWindow': ['pointer', ['pointer', 'uint']],
    'SetWindowTextW': ['bool', ['pointer', 'string']],
    'GetWindowTextW': ['int32', ['pointer', 'pointer', 'int32']],
    'GetClassNameW': ['int32', ['pointer', 'pointer', 'int32']],
    'SendMessageW': ['int32', ['pointer', 'int32', 'int32', 'pointer']],
    'GetDlgCtrlID': ['int32', ['pointer']],
    'GetDlgItem': ['pointer', ['pointer', 'int32']],
    'GetDlgItemTextW': ['int32', ['pointer', 'int32', 'pointer', 'int32']],
    'GetWindowRect': ['bool', ['pointer', 'pointer']],
    'GetWindowDC': ['pointer', ['pointer']],
    'PrintWindow': ['bool', ['pointer', 'pointer', 'uint']],
    'ReleaseDC': ['int32', ['pointer', 'pointer']],
    'OpenClipboard': ['bool', ['pointer']],
    'EmptyClipboard': ['bool', []],
    'SetClipboardData': ['pointer', ['int32', 'pointer']],
    'GetClipboardData': ['pointer', ['int32']],
    'CloseClipboard': ['bool', []]
})
let user32Custom = new FFI.Library('user32.dll', {
    'SendMessageW': ['int32', ['int', 'int32', 'int32', 'pointer']],
    'FindWindowW': ['int', ['string', 'string']],
    'FindWindowExW': ['int', ['int', 'pointer', 'string', 'string']],
})

let gdi32 = new FFI.Library('gdi32.dll', {
    'CreateCompatibleBitmap': ['pointer', ['pointer', 'int32', 'int32']],
    'CreateCompatibleDC': ['pointer', ['pointer']],
    'SelectObject': ['pointer', ['pointer', 'pointer']],
    'DeleteObject': ['bool', ['pointer']],
    'DeleteDC': ['bool', ['pointer']]
})

// let ffihelperDllPath = 'C:\\Users\\Liuxy\\documents\\visual studio 2015\\Projects\\ffihelper\\Release\\ffihelper.dll'
let ffihelperDllPath = path.join(__dirname, './dll/ffihelper.dll')
console.log(ffihelperDllPath)

let ffihelper = null;
module.exports = {user32, gdi32, ffihelper, user32Custom}
