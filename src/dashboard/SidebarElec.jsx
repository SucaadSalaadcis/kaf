import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {HiChartPie, HiInbox, HiUser,HiArrowSmRight, HiViewBoards } from "react-icons/hi";
import { FaBorderNone } from "react-icons/fa";
function SidebarElec() {
  return (
    <Sidebar aria-label="Sidebar with content separator example" >
      <Sidebar.Items className="bg-gray-300">
        <Sidebar.ItemGroup >
          <Sidebar.Item href="/" icon={HiArrowSmRight}>
             Home
          </Sidebar.Item>
          <Sidebar.Item href="/dakashfbon/total" icon={HiChartPie}>
             Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/dakashfbon/upload" icon={HiViewBoards}>
            Upload Electronics
          </Sidebar.Item>
          <Sidebar.Item href="/dakashfbon/manage" icon={HiInbox}>
           Manage Electronics
          </Sidebar.Item>
          <Sidebar.Item href="/dakashfbon/users" icon={HiUser}>
            All Users
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiTable}>
            Logout
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dakashfbon/orders" icon={FaBorderNone}>
            Orders
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}


export default SidebarElec