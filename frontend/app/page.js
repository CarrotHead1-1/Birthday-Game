import React from "react";
// import ProfileCard from "./EvidenceLog/ProfileCard";
import EvidenceLogPage from "./EvidenceLog/EvidenceLogPage";
import NewsPaperArticle from "./components/NewspaperPage";


export default async function Home() {

  return (

    <section className="px-4 md:px-6 max-w-4xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <NewsPaperArticle />
      </div>

    </section>
  )
}