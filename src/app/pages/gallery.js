import React from "react"
import { MainLayout } from "../components/Layout"

export default function index() {
  return (
    // <MainLayout index={2}>
      <div className="blog">
        <div className="wrap">
          <div className="left category list"></div>
          <div className="main post list">
            <ul>
            </ul>
          </div>
        </div>
      </div>
    // </MainLayout>
  );
}