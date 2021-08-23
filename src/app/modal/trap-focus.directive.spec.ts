import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component'
import { TrapFocusDirective } from './trap-focus.directive'

describe('TrapFocusDirective', () => {
  it('should create an instance', () => {
    const directive = new TrapFocusDirective((new PromptDialogComponent).el)
    expect(directive).toBeTruthy()
  })
})
