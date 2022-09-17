import { db } from '@lib/firebase';
import {
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import UpChevron from '@components/Icons/UpChevron';
import DownChevron from '@components/Icons/DownChevron';
import TrashCan from '@components/Icons/TrashCan'
import {AiFillWarning} from 'react-icons/ai'

type Link = {
  id: string;
  title: string;
  description: string;
  url: string;
  rank: number;
  error?:boolean
};

const linksRef = collection(db, "links")

export default function Links() {
  const [links, setLinks] = useState<Link[]>();
  const [deletedLinks, setDeletedLinks] = useState<Link[]>([]);

  useEffect(() => {
    const q = query(collection(db, "links"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      var tempLinks : any = [];
      querySnapshot.forEach((doc) => {
          var tempLink = doc.data()
          tempLink.id = doc.id
          tempLinks.push(tempLink);
      });
      tempLinks.sort(compare_rank)
      setLinks(tempLinks)
    });
  }, [])

  function compare_rank(a : Link, b : Link) {
    if ( a.rank < b.rank){
      return -1;
    }
    if ( a.rank > b.rank){
      return 1;
    }
    return 0;
  }

  const createLink = async (link: any) => {
    await addDoc(linksRef, {
      ...link,
      createdAt: serverTimestamp(),
    });
  };

  const deleteLink = async (id: string) => {
    await deleteDoc(doc(db, 'links', id));
  };

  const updateLink = async (fields : any, id : string) => {
    await updateDoc(doc(db, 'links', id), fields);

  };

  const moveUp = (id : string, rank : number) => {
    if (links && rank != 0) {
      var tempLinks = links
      // updateLink({rank : links[rank - 1].rank + 1}, links[rank - 1].id)
      // updateLink({rank : tempLink.rank - 1}, id)
      tempLinks[rank].rank -= 1
      tempLinks[rank - 1].rank += 1
      tempLinks.sort(compare_rank)
      setLinks([...tempLinks])
    }
  }

  const moveDown = (id : string, rank : number) => {
    if (links && rank != (links.length - 1)) {
      var tempLinks = links
      tempLinks[rank].rank += 1
      tempLinks[rank + 1].rank -= 1
      tempLinks.sort(compare_rank)
      setLinks([...tempLinks])
    }
  }

  const createTempLink = () => {
    if (links) {
      var tempLinks = links
      var tempRank = links.length
      tempLinks.push({
        id: '',
        title: '',
        description: '',
        rank: tempRank,
        url: ''
      })
      setLinks([...tempLinks])
    }
  }
  
  const deleteTempLink = (rank : number) => {
    if (links) {
      var tempLinks = links
      var tempLink = tempLinks[rank]
      tempLinks.splice(rank, 1)
      if (rank != links.length) {
        tempLinks[rank].rank -= 1
      }
      var tempDeletedLinks = deletedLinks
      tempDeletedLinks.push(tempLink)
      setDeletedLinks([...tempDeletedLinks])
      setLinks([...tempLinks])
    }
  }
  
  const saveChanges = () => {
    if (links) {
      var tempLinks = links
      for (var i = 0; i < tempLinks.length; i++) {
        if (tempLinks[i].url == "") {
          tempLinks[i].error = true
          setLinks([...tempLinks])
          return
        } else {
          if (tempLinks[i].id === "") {
            createLink({
              title: tempLinks[i].title,
              description: tempLinks[i].description,
              url: tempLinks[i].url,
              rank: tempLinks[i].rank
            })
          } else {
            updateLink({title: tempLinks[i].title, description: tempLinks[i].description, url: tempLinks[i].url, rank: tempLinks[i].rank}, tempLinks[i].id)
          }
        }        
      }
      
      for (var i = 0; i < deletedLinks.length; i++) {
        if (deletedLinks[i].id !== "") {
          deleteLink(deletedLinks[i].id)
        }
      }
      setDeletedLinks([])
    }
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col w-3/4'>
        {links?.map((link) => {
            return (
              <div className='flex w-full py-5' key={link.id}>
                <div className='flex flex-col w-5/6'>
                  <div className='flex pt-2'>
                    <div className='text-base font-semibold w-1/5 py-2'>Title</div>
                    
                      <input className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]" placeholder="Title" value={link.title} onChange={(e) => {
                          var tempLinks = links
                          tempLinks[link.rank].title = e.target.value
                          setLinks([...tempLinks])
                      }}></input>
                      
            
                  </div>
                  <div className='flex pt-2'>
                    <div className='text-base font-semibold w-1/5 py-2'>Description</div>
                    <textarea className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[90px]" placeholder="Description" value={link.description} onChange={(e) => {
                      var tempLinks = links
                      tempLinks[link.rank].description = e.target.value
                      setLinks([...tempLinks])
                    }}></textarea>
                  </div>
                  <div className='flex pt-2'>
                    <div className='text-base font-semibold w-1/5 py-2'>URL<span className='text-[#FF3939]'>*</span></div>
                    <div className='flex flex-col w-4/5'>
                      <input className={link.error? "w-full bg-[#FAFBFC] border-[#FF3939] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]" : "w-full bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"} 
                            value={link.url}
                            onChange={(e) => {
                                        var tempLinks = links
                                        tempLinks[link.rank].url = e.target.value
                                        tempLinks[link.rank].error = false
                                        setLinks([...tempLinks])
                                      }}
                            placeholder="https://example.com"
                      ></input>
                      {link.error? <div className='text-sm text-[#FF3939] flex align-middle'><span><AiFillWarning className='fill-[#FF3939]'></AiFillWarning></span>This field is required</div> : <></>}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-1/6 px-4 py-1 gap-y-2 pt-2'>
                  <div className='flex flex-col gap-y-4'>
                    <div className="hover:cursor-pointer" onClick={() => {
                      moveUp(link.id, link.rank)
                    }}>
                      <UpChevron className='fill-[#BFBFBF]'></UpChevron>
                    </div>
                    <div className="hover:cursor-pointer" onClick={() => {
                      moveDown(link.id, link.rank)
                    }}>
                      <DownChevron className='fill-[#BFBFBF]'></DownChevron>
                    </div>
                  </div>
                  <div className='hover:cursor-pointer' onClick={() => {
                      deleteTempLink(link.rank)
                    }}>
                    <TrashCan className='fill-[#BFBFBF]'></TrashCan>
                  </div>
                </div>
              </div>
            )
        })}
        
      </div>
      <div className='relative bottom-0 w-full'>
        <div className='flex align-middle justify-between px-4 border-t-[1px] py-4'>
            <div className='text-[#304CD1] font-semibold hover:cursor-pointer' onClick={createTempLink}>+ Add a link</div>
            <div className='py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer' onClick={saveChanges}>Save changes</div>
        </div>
      </div>
    </div>
  );
}
