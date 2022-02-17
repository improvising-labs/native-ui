import React, { useLayoutEffect, useRef } from 'react'
import {
  ModalContext,
  ModalProvider,
  useModalService,
} from '../components/modal-context'

export class ModalService {
  context?: ModalContext

  private ids: Set<string>

  constructor() {
    this.ids = new Set<string>()
  }

  mount(context: ModalContext) {
    this.context = context
  }

  unmount() {
    delete this.context
  }

  create(node: React.ReactNode) {
    const id = Date.now().toString()

    if (!this.context) {
      throw new Error('ModalContext is not mounted')
    }

    this.context?.set(id, node)
    this.ids.add(id)

    return () => {
      this.context?.delete(id)
      this.ids.delete(id)
    }
  }
}

export const createModalService = () => new ModalService()

export const globalModalService = createModalService()
export const modalServiceRef = { current: globalModalService }

export const withModal =
  <P extends {}>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const currentModalService = useRef(useModalService()).current
    const nextModalService = useRef(createModalService()).current

    useLayoutEffect(() => {
      modalServiceRef.current = nextModalService

      return () => {
        modalServiceRef.current = currentModalService
      }
    }, [])

    return (
      <ModalProvider modalService={currentModalService}>
        <Component {...props} />
      </ModalProvider>
    )
  }
