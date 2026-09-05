import { Component, type ErrorInfo, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode, onError?: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Museum WebGL scene failed', error, info)
    this.props.onError?.()
  }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}
