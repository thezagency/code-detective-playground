
import { useRef, useEffect } from "react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/themes/prism-tomorrow.css";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  className?: string;
}

const CodeEditor = ({ 
  value, 
  onChange, 
  language = "javascript", 
  readOnly = false,
  className
}: CodeEditorProps) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);

  const getLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
      case "js":
        return languages.javascript;
      case "typescript":
      case "ts":
        return languages.typescript;
      case "python":
      case "py":
        return languages.python;
      case "java":
        return languages.java;
      case "c":
        return languages.c;
      case "cpp":
      case "c++":
        return languages.cpp;
      default:
        return languages.javascript;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  const syncScroll = () => {
    if (editorRef.current && previewRef.current) {
      previewRef.current.scrollTop = editorRef.current.scrollTop;
      previewRef.current.scrollLeft = editorRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = highlight(
        value,
        getLanguage(language),
        language
      );
    }
  }, [value, language]);

  return (
    <div className={cn("relative font-mono text-sm rounded-md overflow-hidden", className)}>
      <pre 
        ref={previewRef} 
        className="bg-gray-900 p-4 overflow-auto text-white rounded-md"
        aria-hidden="true"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          margin: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        }}
      />
      <textarea 
        ref={editorRef}
        value={value}
        onChange={handleChange}
        onScroll={syncScroll}
        className={cn(
          "w-full bg-transparent min-h-[300px] p-4 text-transparent caret-white resize-y overflow-auto rounded-md border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition",
          readOnly ? "bg-gray-900/80 opacity-80" : ""
        )}
        style={{
          lineHeight: '1.5',
          fontFamily: 'monospace',
          color: 'transparent',
          caretColor: 'white',
          background: 'transparent',
        }}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        readOnly={readOnly}
      />
    </div>
  );
};

export default CodeEditor;
