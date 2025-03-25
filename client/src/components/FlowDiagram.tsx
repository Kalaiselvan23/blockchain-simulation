import React from 'react'
import { DialogContent, DialogTitle, DialogHeader, Dialog } from './ui/dialog'

import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react'

type propsType = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  nodes: any,
  edges: any,
}

const FlowDiagram = ({ isModalOpen, setIsModalOpen, nodes, edges }: propsType) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="dialog-content">        
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b p-4">
            <DialogTitle>Blockchain Flow Diagram</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-4">
            <ReactFlow colorMode='dark' nodes={nodes} edges={edges} fitView>
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FlowDiagram
