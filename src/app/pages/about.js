import React from "react"
import { MainLayout } from "../components/Layout"

export default function index() {
  return (
    // <MainLayout index={0}>
      <div className="about">
        <section className="career">
          <div className="wrap">
            <div>
              <h1>경력</h1>
              <div className="item">
                <b>더존비즈온</b><span className="period">2021.09. - 현재</span>
                <span className="position">WEHAGO 백엔드(선임연구원)</span>
              </div>
              <div className="item">
                <b>디큐</b><span className="period">2017.02. - 2021.09.</span>
                <span className="position">웹개발(과장)</span>
              </div>
              <div className="item">
                <b>필아이티</b><span className="period">2013.02. - 2017.02.</span>
                <span className="position">앱개발(선임연구원)</span>
              </div>
              <div className="item">
                <b>인스모바일</b><span className="period">2008.12. - 2012.12.</span>
                <span className="position">앱개발(주임연구원)</span>
              </div>
              <div className="item">
                <b>마루인포</b><span className="period">2008.03. - 2008.10.</span>
                <span className="position">앱개발(사원)</span>
              </div>
            </div>
            <div>
              <h1>학력</h1>
              <div className="item">
                <b>건국대학교</b><span className="period">1999. - 2006.</span>
                <span className="position">전기공학과 학사</span>
              </div>
            </div>
          </div>
        </section>
        <section className="skill">
          <div className="wrap">
            <h1>보유기술</h1>
            <div className="line">
              모바일: Android, Java, Eclipse
            </div>
            <div className="line">
              웹: Java, JSP, Spring, myBatis, Eclipse
            </div>
          </div>
        </section>
        <section className="skill">
          <div className="wrap">
            <h1>그외</h1>
            <div className="line">
              Svn, Git, DB 마이그레이션, Linux, Apache, Tomcat, C, HTML, CSS, Javascript(∝ jQuery)
            </div>
          </div>
        </section>
        <section className="interest">
          <div className="wrap">
            <h1>관심분야</h1>
            <div className="line">
              Node, Typescript
            </div>
          </div>
        </section>
      </div>
    // </MainLayout>
  )
}