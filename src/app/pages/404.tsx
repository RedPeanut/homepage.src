import React from "react"
import { Helmet } from "react-helmet"
import { PlainLayout, MainLayout } from "../components/Layout"

const NotFoundPage = () => (
  <MainLayout>
    <div>
      <Helmet title="404: Not found"/>
      <div className="_404">
        <section>
          <h1>페이지를 찾을 수 없습니다</h1>
          <p>찾는 페이지가 삭제되었거나 이동되었을 수 있습니다.</p>
        </section>
      </div>
    </div>
  </MainLayout>
)

export default NotFoundPage
