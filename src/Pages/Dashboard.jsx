import axios from "axios";
import { Space, Spin } from "antd";
// import ReactLoading from "react-loading";
import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
const Dashboard = () => {
  // ++++++++++++URL SEARCH PARAMS+++++++++++++++
  // const params = useSearchParams()
  // const {ParamKeyValuePair,closure} = useSearchParams()
  // console.log(params)
  // console.log(params[1].scopes)
  //======================================================

  const [users, setUsers] = useState([]);
  const [searchStr, setSearchStr] = useState([]);
  const [displayData, setDisplayData] = useState(null);
  const [flag, setFlag] = useState(false);
  const params = useLocation();
  console.log(params.search);

  useEffect(() => {
    axios.get("https://reqres.in/api/users" + params.search).then((res) => {
      console.log("response res", res);
      console.log("gfgg", res.data.data);
      //  { const status = setLocalStorage("response", res.data.data);
      //   // console.log(status);
      //   const usersdata = GetLocalStorage("response");
      //   // console.log(JSON.parse(usersdata))
      //   setUsers(JSON.parse(usersdata));}
      // setFlag(false)
      console.log(res);
      setUsers(res.data.data);
      setDisplayData(res.data.data);
      setFlag(true);
    });
  }, [params]);

  const getstate = (e) => {
    setSearchStr(e);
    console.log(e);
    console.log(searchStr);
    cardfilter(e);
  };
  function cardfilter(param) {
    // setFlag(false);
    // setFlag(true);

    // let ans = users.filter(obj => Object.values(obj).some(val => val.includes(searchStr)));
    let ans = users.filter((obj) =>
      JSON.stringify(obj).toLowerCase().includes(param)
    );
    console.log("answer", ans);
    setDisplayData(ans);
  }

  return (
    <div>
      <div className="">
        <Navbar className="" state={getstate}></Navbar>
      </div>
      <p className="text-center text-3xl my-4"> WELCOME TO DASHBOARD </p>
      <div className="mx-[10%]">
        {flag ? (
          <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-16">
            {displayData ? (
              displayData.map((elem) => <Card data={elem} key={elem.id}></Card>)
            ) : (
              <p>loading</p>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-48">
            <Space size="large">
              <Spin size="large" />
            </Space>
          </div>
        )}
        <Link to="/dashboard?page=1">Page1</Link> |{" "}
        <Link to="/dashboard?page=2">Page2</Link>
      </div>
    </div>
  );
};

export default Dashboard;
