import React, { useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import ReactJsonView from 'react-json-view'
import JsonParsedItem from './json-viewer/JsonParsedItem'

const Container = styled.div`
`

const theme = {
  base00: "white",
  base01: "#ddd",
  base02: "#ddd",
  base03: "#444",
  base04: "#ccc", // object-size
  base05: "#444",
  base06: "#444",
  base07: "#444",
  base08: "#444",
  base09: "000", // value
  base0A: "#e47600",
  base0B: "#e47600",
  base0C: "#aaa", // array key
  base0D: "#aaa", // arrow
  base0E: "#0e1d4c", // folded arrow
  base0F: "#08f"
}

const JsonViewer = ({ src }) => {
  const ref = useRef(null)

  const highlightKeywords = useCallback(() => {
    const keywords = [
      'account', 
      'name',
      'from',
      'to',
      'quantity',
      'price',
    ]
    
    try {
      const rows = ref.current.querySelectorAll('.variable-row')
      rows.forEach((node) => {
        const keyNode = node.querySelector('.object-key')
        const valueNode = node.querySelector('.variable-value')
        const keyText = keyNode.textContent.slice(1, -1);
    
        const isImportant = keywords.includes(keyText)
        if (!isImportant) return;
    
        valueNode.style.color = '#083ade';
        valueNode.style.paddingRight = '0px';
        valueNode.style.borderBottom = '1px dashed';
      })
    } catch (err) {
      console.log('cannot highlight');
    }
  }, [])

  useEffect(() => {
    highlightKeywords()

    const observer = new MutationObserver(highlightKeywords)
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Container ref={ref}>
      <JsonParsedItem src={src} />
      {/* <ReactJsonView
        src={src}
        name={null}
        indentWidth={3}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        shouldCollapse={(field) => {
          const { name } = field
          switch (name) {
            case 'authorization':
              return true;
            default:
              return false;
          }
        }}
        theme={theme}
        style={{
          padding: `8px`,
          fontSize: 13,
          background: 'transparent',
          fontFamily: 'var(--monospace)',
          wordBreak: "break-all"
        }}
      /> */}
    </Container>
  )
}

export default JsonViewer
