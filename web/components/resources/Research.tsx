import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ResearchURL from './ResearchURL';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@lib/firebase';
import { useRouter } from 'next/router';

const mdParser = new MarkdownIt();

function Research(props: {
  getChangesMade: () => boolean;
  setChangesMade: Dispatch<SetStateAction<boolean>>;
}) {
  const [initialMarkdown, setInitialMarkdown] = useState('');
  const [initialUrls, setInitialUrls] = useState(['']);

  const [markdown, setMarkdown] = useState('');
  const [urls, setUrls] = useState(['']);
  const router = useRouter();

  useEffect(() => {
    props.setChangesMade(
      JSON.stringify(urls) !== JSON.stringify(initialUrls) ||
        markdown !== initialMarkdown
    );

    const warningText =
      'You have unsaved changes - are you sure you wish to leave this page?';
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!props.getChangesMade()) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!props.getChangesMade) return;
      if (window.confirm(warningText)) return;
      throw 'routeChange aborted.';
    };
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [markdown, urls, initialMarkdown, initialUrls]);

  useEffect(() => {
    let ignore = false;

    getDoc(doc(db, 'resources/research')).then((doc) => {
      if (!ignore) {
        setInitialMarkdown(doc?.data()?.markdown);
        setInitialUrls(doc?.data()?.url);
        setMarkdown(doc?.data()?.markdown);
        setUrls(doc?.data()?.url);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);
  function setInfo() {
    const researchDoc = doc(db, 'resources', 'research');
    setDoc(researchDoc, {
      markdown,
      url: urls,
    });
    setInitialMarkdown(markdown);
    setInitialUrls(urls);
    console.log('reached here');
  }
  return (
    <>
      <div className="w-full h-full pb-20  px-10">
        <div className="flex flex-col w-full">
          <div className="flex w-full py-5">
            <div className="flex flex-col w-5/6">
              <div className="flex pt-2">
                <label
                  htmlFor="description"
                  className="text-base font-semibold w-1/5 py-2"
                >
                  Description
                </label>

                <div className="flex flex-col w-4/5">
                  <MdEditor
                    style={{ maxHeight: 600, minHeight: 300 }}
                    value={markdown}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({ text }) => {
                      setMarkdown(text);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {urls.map((url, index) => {
            return (
              <ResearchURL
                url={url}
                setUrl={(url) => {
                  setUrls(urls.map((old, i) => (i === index ? url : old)));
                }}
                delete={() => {
                  setUrls(urls.filter((_, i) => i !== index));
                }}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-white border-t-[1px] px-10 py-4 max-w-[calc(100vw-318px)]">
        <div className="flex items-center justify-between">
          <div
            className="text-[#304CD1] font-semibold hover:cursor-pointer"
            onClick={() => {
              setUrls([...urls, '']);
            }}
          >
            + Add a link
          </div>
          <button
            className={`py-2 px-3 rounded font-semibold hover:cursor-pointer border-[1px]
            ${
              props.getChangesMade()
                ? 'py-2 px-3 rounded border-[#304CD1] text-[#304CD1] hover:bg-[#304CD1] hover:text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer'
                : 'py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer'
            }`}
            onClick={setInfo}
          >
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}

export default Research;
