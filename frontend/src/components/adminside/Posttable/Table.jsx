import React, { useEffect, useState } from 'react';
import axios from '../../../Axios';
import Reportmodal from '../modals/Reportmodal';

function Table() {
  const [post, setpost] = useState([]);
  const [modal, showmodal] = useState(false);
  const [postdetails, setpostdetails] = useState();
  useEffect(() => {
    const fetchreportedpost = async () => {
      const { data } = await axios.get(`admin/getreported`, {
        withCredentials: true,
      });
      setpost(data.reported);
    };
    fetchreportedpost();
  }, []);
  const postrestrict = async (postid,value) => {
    try {
      const { data } = await axios.patch(
        `admin/restrictpost/${postid}`,
        {value},
        { withCredentials: true }
      );
      setpost(data.reportedpost);
    } catch (error) {}
  };
  const handelmodal = (e) => {
    try {
      console.log(e);
      showmodal(true);
      setpostdetails(e);
    } catch (error) {}
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      description
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      reason
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Active
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {post.map((e) => {
                    return (
                      <>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {e.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {e.description}
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <p
                              onClick={() => {
                                handelmodal(e);
                              }}
                              className="text-blue-500 underline cursor-pointer"
                            >
                              see details
                            </p>
                          </td>
                          <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <label className="inline-flex relative items-center mr-5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!e.deleteflag}
                                onChange={() => {
                                  postrestrict(e._id,e.deleteflag);
                                }}
                                className="sr-only peer"
                                readOnly
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal ? <Reportmodal show={showmodal} postdetails={postdetails} /> : ''}
    </div>
  );
}

export default Table;
