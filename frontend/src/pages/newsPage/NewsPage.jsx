import "./NewsPage.css";
import React, { useState } from 'react';

const initialArticles = [
   {
     id: 1,
     title: 'Aktualizacja funkcji Power Apps: Typy Danych',
     author: 'Kacper Lewicki',
     date: 'Styczeń 2023',
     content: `W styczniu 2023 r. wprowadzono istotne aktualizacje dla Power Apps, w tym migrację typów danych Access Number:Single 
     i Number:Double do typu danych Float w Dataverse. Użytkownicy otrzymali możliwość migracji tych typów danych, 
     z zastrzeżeniem, że po migracji zapisywanych jest tylko 5 cyfr po przecinku. Wprowadzono także nowy wygląd dla aplikacji modelu napędzanego 
     danymi (model-driven apps), oferujący bardziej przejrzysty design, optymalizację pod kątem akcji, 
     ulepszoną współdzielenie i nową siatkę wspierającą szybsze przewijanie i edycję w linii.`
   },

   {
      id: 2,
      title: 'Nowe i planowane funkcje dla Power Automate',
      author: 'Kacper Lewicki',
      date: 'Pażdziernik 2023',
      content: ` W ramach pierwszej fali wydawniczej w 2023 r. dla Power Automate, wprowadzono nowe funkcje dla przepływów chmurowych (cloud flows), 
      które umożliwiają automatyzację zadań za pomocą setek konektorów. Wśród nowości znalazły się takie funkcje jak generowanie wyrażeń z przykładów, 
      możliwość posiadania i uruchamiania przepływów przez aplikacje użytkowników zasadniczych, usprawnienia aplikacji mobilnej Power Automate dla iOS, 
      a także liczne ulepszenia w nawigacji i integracji z Excel. Dodano także Copilot dla Power Automate, umożliwiający tworzenie automatyzacji 
      za pomocą języka naturalnego​​.`
   },

   {
      id: 3,
      title: 'Uruchomienie Power Automate Process Mining i nowej generacji AI',
      author: 'Justin Graham',
      date: 'Śierpień 2023',
      content: ` Microsoft ogłosił ogólną dostępność Power Automate Process Mining w sierpniu 2023, rozszerzając ofertę low-code o nowe możliwości 
      analizy procesów biznesowych. Nowe licencje, takie jak „Power Automate Premium” i „Power Automate Process”, oferują dostęp do nieograniczonych 
      przepływów chmurowych i desktopowych oraz narzędzia do procesu mining. Wprowadzenie tych narzędzi ma na celu zwiększenie 
      wartości licencji Microsoft Power Platform, zapewniając kompleksową platformę low-code, która umożliwia organizacjom modernizację 
      w skali i tworzenie innowacyjnych rozwiązań.`
   },

   {
      id: 4,
      title: 'What’s new: Power Apps January 2024 Feature Update',
      author: 'Clay Wesener',
      date: 'January 2024',
      content: ` Announcing General availability of Power Platform Customer managed key auto key rotation with Azure key vault key versioning. 
      Data encryption is one of several defenses-in-depth that is available to secure storage. All your customer data and configuration information 
      stored in Power Platform is encrypted at-rest with strong Microsoft-managed encryption keys. Power Platform offers customer managed key (CMK) for 
      added data protection control, by allowing customers to manage their own encryption keys. You can create your own encryption keys using Azure key vault.
      We are excited to announce the general availability of using Azure key vault key version to auto rotate your encryption key.  You can use the Rotation 
      policy or the Rotate now to rotate the encryption key.`
   },

   {
      id: 5,
      title: 'What’s new: Power Apps November 2023 Feature Update',
      author: 'Clay Wesener',
      date: 'November 2023',
      content: `Makers can now create solution-aware cards for Power Apps for easier application lifecycle management (ALM) 
      and manage card access via Security roles and Data loss prevention policies (DLP). 
      Makers can create cards for Power Apps directly in a solution or add existing cards to a solution.  
      Administrators can now use Security roles to control who can read, write and create cards for Power Apps in any 
      Power Platform environment, or can disable cards for Power Apps feature for all users in a Power Platform environment.
      We’re happy to announce that the improved Power Fx Formula Bar is generally available in Power Apps Studio bringing a more familiar 
      development experience for those who have used Visual Studio Code. New apps created after the 2312.1 release of Power Apps Studio will 
      see an improved signature help allowing you to visualize multiple overrides of Power Fx functions, an updated suggestion list viewing more 
      suggestions to use in your formulas, and more responsive color highlighting. The Power Fx Formula Bar setting is available in the Preview feature settings, 
      which can be change to enable the improved Power Fx Formula Bar in older apps or go back to the legacy formula bar. We are continuing to improve the experience 
      and would love your feedback in the community forums. `
   },

   {
      id: 6,
      title: 'What’s new: Power Apps October 2023 Feature Update',
      author: 'Clay Wesener',
      date: 'October 2023',
      content: `Microsoft Power Platform comes with advanced risk and compliance features that give you an 
      easy cost-effective way to cover your risks and compliance needs. Customer-managed key (CMK) allows you to meet your compliance 
      needs by providing the ability for your organization to manage your encryption keys in your Azure key vault and allows you to use 
      separate encryption keys for different Dataverse environments to encrypt your customer data at-rest. 
      As part of these commitments, we are pleased to announce the following CMK service updates.  
      
      Generally available:
      
      Encrypt your environment with key from Azure Key vault with private link. 
      You can secure your Azure Key Vault network by establishing a private link connection. 
      This allows you to connect your virtual network using private endpoints 
      to secure your Azure key vault access with our CMK services.  
      
      Migrate your bring-your-own-key (BYOK) environments to customer-managed key (CMK) with no system downtime.  
      The environment remains enable when you migrate it from BYOK to CMK. 
      
      Preview: 
      
      Encrypt your environment data with key from Azure Key Vault managed HSM (Hardware Security module) 
      You can use an encryption key created from the Azure Key Vault Managed HSM to encrypt your environment data. 
      This gives you FIPS 140-2 Level 3 support. 
      Auto rotate your encryption key using Azure Key Vault key version 
      You can rotate your encryption key using new key version. The new key version is automatically 
      rotated in the background and there is no action required by the Power Platform admin.  `
   },

];

const NewsPage = () => {

   const [searchTerm, setSearchTerm] = useState('');
   const [articles, setArticles] = useState(initialArticles);

 
      const filteredArticles = articles.filter(

           (article) =>
             article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
       
   
      const handleSearchChange = (event) => {
         setSearchTerm(event.target.value);
      };
       
   return (
      <>
        <h1 className="NewsPage-header">News</h1>

        <div className="NewsPage-search-container">
          <input
            type="text"
            className="NewsPage-search"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="NewsPage-form-container">
          {filteredArticles.map((article) => (
            <form key={article.id} className="NewsPage-form">
              <h1 className="NewsPage-title">{article.title}</h1>
              <h2 className="NewsPage-subtitle">Autor: {article.author}</h2>
              <h3 className="NewsPage-date">Data: {article.date}</h3>
              <p className="NewsPage-content">{article.content}</p>
            </form>
          ))}
        </div>
      </>
    );
  };

export default NewsPage;
