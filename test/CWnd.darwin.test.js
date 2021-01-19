const expect = require('chai').expect
const { CWnd } = require('../lib')
describe('CWnd TEST', function () {
  // add
  it('static add', async function() {
    console.log('num:', CWnd.testInt(1))
    console.log('string:', CWnd.testString("1"))
    console.log('string:', CWnd.AllWindowInfo())
    console.log('.......')
    let win = CWnd.GetWindowWithName("风驰万里1", "Aliworkbench")
    let ownerPid = CWnd.GetOwnerPidWithName("风驰万里1", 'Aliworkbench')
    let app = CWnd.GetRunningAppWithOwnerPid(ownerPid)
    let win2 = CWnd.GetFocusWindowWithOwnerPid(ownerPid)
    let win3 = CWnd.GetFocusWindowWithOwnerPid(ownerPid)
    console.log('win:', ownerPid, win, win2, win3, CWnd.GetWindowTitle(win), CWnd.GetWindowTitle(win2), CWnd.GetWindowTitle(win3))
    console.log('title：', CWnd.GetWindowTitle(win));
  })
  // GetRunningAppWithOwnerPid
  // it('static GetRunningAppWithName', async function() {
  //   let ownerPid = CWnd.GetOwnerPidWithName("风驰万里1", "Aliworkbench")
  //   if (ownerPid) {
  //     let runningApp = CWnd.GetRunningAppWithOwnerPid(ownerPid)
  //     console.log(11, runningApp)
  //     console.log(22, CWnd.SetForegroundApp(runningApp))
  //     setTimeout(() => {
  //       console.log('continue ...')
  //       // 复制文字到粘贴板
  //       console.log(CWnd.PasteboardCopyString("hello world"))
  //       // 粘贴
  //       console.log(CWnd.PostEventKey(CWnd.MACRO.KEY_CODE_V, CWnd.MACRO.FLAG_MASK_COMMAND))
  //       console.log(CWnd.PostEventKey(CWnd.MACRO.KEY_CODE_RETURN))
  //     }, 3000)
  //   }
  // })
})
