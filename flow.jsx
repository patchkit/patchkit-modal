'use babel'
import React from 'react'
import SteppedProgressBar from 'patchkit-stepped-progress-bar'

export default class ModalFlow extends React.Component {
  static contextTypes = {
    emit: React.PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      step: false,
      isHighlighted: true,
      isValid: false,
      helpText: false
    }
  }

  componentDidMount() {
    // go to first step
    this.gotoStep(0)
  }

  gotoStep(step, cb) {
    this.setState({
      step: step,
      helpText: false,
      isHighlighted: true,
      isValid: false
    }, cb)
  }

  gotoNextStep() {
    this.gotoStep(this.state.step + 1, () => {
      if (!this.getStepCom()) {
        this.setState({ step: 0 })
        this.props.onClose && this.props.onClose()
      }
    })
  }

  getStepCom() {
    if (this.state.step === false)
      return false
    return this.props.Forms[this.state.step]
  }

  getStepProps() {
    if (this.state.step === false)
      return false
    return this.props.formsProps[this.state.step]
  }

  onNextClick() {
    const step = this.refs.step
    const next = (step && step.submit.bind(step)) || this.gotoNextStep.bind(this)
    next(err => {
      if (err)
        this.context.emit('error', err)
      else
        this.gotoNextStep()
    })
  }

  render() {
    var StepCom = this.getStepCom()
    var stepProps = this.getStepProps()
    if (!this.props.isOpen || !StepCom)
      return <span/>

    const nextText = (this.state.step >= (this.props.Forms.length - 1)) ? 'Finish' : 'Next'
    
    var nextCls = ['btn']
    if (!this.state.isValid)
      nextCls.push('disabled')
    else if (this.state.isHighlighted)
      nextCls.push('highlighted')

    const setHelpText = helpText => { this.setState({ helpText: helpText }) }
    const setIsValid = isValid => { this.setState({ isValid: isValid }) }
    const setIsHighlighted = isHighlighted => { this.setState({ isHighlighted: isHighlighted }) }

    return <div className={'modal modal-flow '+(this.props.className||'')}>
      <div className="modal-inner">
        <div className="modal-content">
          <StepCom ref="step" setIsHighlighted={setIsHighlighted} setIsValid={setIsValid} setHelpText={setHelpText} gotoNextStep={this.gotoNextStep.bind(this)} {...stepProps} />
        </div>
        { this.state.helpText ? <div className="modal-helptext">{this.state.helpText}</div> : '' }
        <div className="modal-ctrls">
          <SteppedProgressBar current={this.state.step} labels={this.props.labels} num={this.props.labels ? this.props.labels.length : this.props.Forms.length} />
          <div className="next">
            <button disabled={!this.state.isValid} className={nextCls.join(' ')} onClick={this.onNextClick.bind(this)}>
              {nextText} <i className="fa fa-angle-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  }
}