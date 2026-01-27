import { GeneralSection} from './General.jsx'
import { EducationSection } from './Education.jsx'

export function MainSection() {
    return(
        <main>
            <div className="form-section">
                <GeneralSection/>
                <EducationSection/>
            </div>
            <div className="preview-section">
                
            </div>
        </main>
    )
}