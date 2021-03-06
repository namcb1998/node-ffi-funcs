const expect = require('chai').expect
const { CWnd } = require('../lib/')
describe('CWnd TEST', function () {
  // GetDesktopWindow 获取桌面下的窗口
  it('static GetDesktopWindow', async function() {
    let hWnd = CWnd.GetDesktopWindow()
    expect(!!hWnd).to.be.ok
  })
  // FindWindow 获取桌面下的窗口
  it('static FindWindow', async function() {
    let hWnd = CWnd.FindWindow(null, null)
    expect(!!hWnd).to.be.ok
    let className = CWnd.GetClassName(hWnd)
    let hWnd2 = CWnd.FindWindow(className, null)
    // 判断Buffer是否为同一句柄，需要判断他们地址是否相同 important
    expect(hWnd.address() === hWnd2.address()).to.be.ok
  })
  // FindWindowEx 提供父聚丙和某个子聚丙，以此为基础向下寻找某个符合的窗口
  it('static FindWindowEx', async function() {
    let hWnd = CWnd.FindWindow(null, null)
    let hWnd2 = CWnd.FindWindowEx(null,null, null, null)
    expect(hWnd.address() === hWnd2.address()).to.be.ok
  })
  // // IsWindowVisible
  it('static IsWindowVisible', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let isWindowVisible = CWnd.IsWindowVisible(hWnd)
    expect(isWindowVisible).to.be.ok
  })
  // SetForegroundWindow
  // it('static SetForegroundWindow', async function() {
  //   let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
  //   let isSetForeground = CWnd.SetForegroundWindow(hWnd)
  //   expect(isSetForeground).to.be.ok
  // })
  // GetParent
  it('static GetParent', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)

    let startHWnd = CWnd.FindWindowEx(hWnd, null, 'Start', null)
    let parentHWnd = CWnd.GetParent(startHWnd)

    expect(hWnd.address() === parentHWnd.address()).to.be.ok
  })
  // GetParent
  it('static GetWindow', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)

    let startHWnd = CWnd.FindWindowEx(hWnd, null, 'Start', null)
    // 获取窗口的第一个窗口
    let startHWnd2 = CWnd.GetWindow(hWnd, CWnd.MACRO.GW_CHILD)
    // 前一个被激活的窗口
    let preHWnd = CWnd.GetWindow(hWnd, CWnd.MACRO.GW_HWNDPREV)
    // 后一个被激活的窗口
    let hWnd2 = CWnd.GetWindow(preHWnd, CWnd.MACRO.GW_HWNDNEXT)
    expect(startHWnd.address() === startHWnd2.address()).to.be.ok
    expect(hWnd.address() === hWnd2.address()).to.be.ok
  })
  // GetClassName
  it('static GetClassName', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    expect(CWnd.GetClassName(hWnd) === "Shell_TrayWnd").to.be.ok
  })
  // SetWindowText GetWindowText
  it('static SetWindowText/GetWindowText', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    CWnd.SetWindowText(hWnd, "CustomTrapName")
    let winName = CWnd.GetWindowText(hWnd)
    expect(winName === "CustomTrapName").to.be.ok
  })
  // // SendMessage
  // it('static SendMessage', async function() {
  //   // 输入框设置文本
  //   // CWnd.SendMessage(textWnd, CWnd.MACRO.WM_SETTEXT, null, '好了3')
  //   // 回车发送消息
  //   // CWnd.SendMessage(textWnd, CWnd.MACRO.WM_KEYDOWN, CWnd.Message.VK_RETURN, null)
  // })
  // C_FindWindow
  it('static C_FindWindow', async function() {
    let hWnd = CWnd.C_FindWindow(null, null, "Start", null)
    let parentClassName = CWnd.GetClassName(CWnd.GetParent(hWnd))
    expect(parentClassName === "Shell_TrayWnd").to.be.ok
  })

  // C_GetWindowFirstSibling C_GetWindowPreviousSibling C_GetWindowNextSibling C_GetWindowLastSibling
  it('static GetWindow/C_FindWindowSiblingPrevious/C_FindWindowSiblingNext', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let startHWnd = CWnd.C_FindWindow(hWnd, null, "Start", null)
    let nextHWND = CWnd.C_FindWindow(hWnd, startHWnd)

    let firstChild = CWnd.C_GetWindowFirstChild(hWnd)
    let firstSibling = CWnd.C_GetWindowFirstSibling(nextHWND)
    let nextSibling = CWnd.C_GetWindowNextSibling(startHWnd)
    let preSibling = CWnd.C_GetWindowPreviousSibling(nextHWND)
    let lastSibling = CWnd.C_GetWindowLastSibling(startHWnd)

    expect(startHWnd.address() === firstChild.address()).to.be.ok
    expect(startHWnd.address() === firstSibling.address()).to.be.ok
    expect(startHWnd.address() === preSibling.address()).to.be.ok
    expect(nextHWND.address() === nextSibling.address()).to.be.ok
    expect(nextHWND.address() === nextSibling.address()).to.be.ok
    expect(!CWnd.C_FindWindow(hWnd, lastSibling)).to.be.ok
  })

  // C_FindWindowSiblingPrevious C_FindWindowSiblingNext
  it('static C_FindWindowSiblingPrevious/C_FindWindowSiblingNext', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let startHWnd = CWnd.C_FindWindow(hWnd, null, "Start", null)
    CWnd.SetWindowText(startHWnd, "CustomStart")
    let nextHWnd = CWnd.C_FindWindow(hWnd, startHWnd, null, null)
    CWnd.SetWindowText(nextHWnd, "CustomNext")
    let startHWnd2 = CWnd.C_FindWindowSiblingPrevious(nextHWnd)
    let nextHWnd2 = CWnd.C_FindWindowSiblingNext(startHWnd)
    expect(startHWnd.address() === startHWnd2.address()).to.be.ok
    expect(nextHWnd.address() === nextHWnd2.address()).to.be.ok
  })
  // GetWindowRect
  it('static GetWindowRect', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let rect = CWnd.GetWindowRect(hWnd)
    expect(!!rect).to.be.ok
  })
  // C_HWNDToBmpClipboard
  it('static C_HWNDToBmpClipboard', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    CWnd.C_HWNDToBmpClipboard(hWnd)
    let hBitmap = CWnd.GetClipboardData(CWnd.MACRO.CF_BITMAP)
    expect(!!hBitmap).to.be.ok
  })
  // C_HWndToBmpFile
  it('static C_HWndToBmpFile', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let startHWnd = CWnd.C_FindWindow(hWnd, null, "Start", null)
    let bmpImgPath = CWnd.C_HWndToBmpFile(startHWnd)
    console.log(bmpImgPath)
    expect(!!bmpImgPath).to.be.ok
  })
  // // FIXME: CUSTOM TEST
  // it('static FindWindow', async function() {
  //   let className = 'StandardFrame'
  //   let hWnd = CWnd.FindWindow(className, null)
  //   while (hWnd && !hWnd.isNull()) {
  //     let className = CWnd.GetClassName(hWnd)
  //     let windowTitle = CWnd.GetWindowText(hWnd)
  //     console.log(`window className: ${className}, title: ${windowTitle}`)
  //     if (windowTitle.match('风驰万里1')) {
  //       console.log('real find chat window', 'visible:', CWnd.IsWindowVisible(hWnd))
  //       console.log('active window: ', CWnd.SetForegroundWindow(hWnd))
  //       let textWnd = CWnd.C_FindWindow(hWnd, null, 'RichEditComponent', null)
  //       if (textWnd) {
  //         // let buttonParentHWnd = CWnd.GetParent(CWnd.GetParent(CWnd.GetParent(textWnd)))
  //         // console.log('real find RichEditComponent', textWnd)
  //         // let afterChildHWND = CWnd.C_FindWindowSiblingNext(CWnd.FindWindowEx(buttonParentHWnd, null))
  //         // let buttonHWND = CWnd.C_FindWindow(buttonParentHWnd, afterChildHWND, "EditComponent")
  //         // console.log(1, buttonHWND, CWnd.GetDlgItemText(buttonHWND))
  //         ////////////////
  //         // 输入框设置文本
  //         // CWnd.SendMessage(textWnd, CWnd.MACRO.WM_SETTEXT, null, '好了3')
  //         // 回车发送消息
  //         // CWnd.SendMessage(textWnd, CWnd.MACRO.WM_KEYDOWN, CWnd.Message.VK_RETURN, null)
  //       }
  //       // 获取输入框的文字
  //       // if (textWnd) {
  //       //   let buf = Buffer.alloc(255)
  //       //   CWnd.SendMessage(textWnd, CWnd.Message.WM_GETTEXT, buf.byteLength, buf)
  //       //   console.log('text: ', buf.toString('ucs2').replace(/\\0+$/g, ''))
  //       // }
  //       break
  //     } else {
  //       hWnd = CWnd.FindWindowEx(null, hWnd, className, null)
  //     }
  //   }
  //   expect(!!hWnd).to.be.ok
  // })
})
