import React from 'react'
import { DialogTrigger, DialogContent, DialogTitle, DialogHeader, Dialog } from './ui/dialog'
import { Button } from './ui/button'
import { Eye } from 'lucide-react'
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
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye />
        </Button>
      </DialogTrigger>
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
