import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';
import './UploadLand.css';

export default function UploadLand() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ownerName: '',
    surveyNumber: '',
    landType: 'agricultural',
    gajam: '',
    pricePerGajam: '',
  });

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'verified' | 'review'>('idle');

  // Part 7: Price & Unit System Auto Conversion Logic
  // 1 Gajam = 1 Sq Yard; 1 Acre = 4840 Sq Yards
  const converted = useMemo(() => {
    const gajam = parseFloat(formData.gajam) || 0;
    const pricePerGajam = parseFloat(formData.pricePerGajam) || 0;
    return {
      sqYards: gajam,
      acres: Number((gajam / 4840).toFixed(4)),
      totalPrice: gajam * pricePerGajam,
    };
  }, [formData.gajam, formData.pricePerGajam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadStatus('uploading');
      // Part 6: Document Verification (Mock AI OCR)
      setTimeout(() => {
        // Randomly simulate success or review needed
        const isClean = Math.random() > 0.3;
        setUploadStatus(isClean ? 'verified' : 'review');
      }, 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Part 12: Fraud Prevention Mock (Duplicate check)
      if (formData.surveyNumber.toLowerCase().includes('dup')) {
        alert('FRAUD ALERT: This survey number is already listed or flagged by our system. Your request implies a duplicate listing.');
        return;
      }
      setStep(2);
    }
    else if (step === 2 && uploadStatus !== 'idle') {
      alert('Land Listing Submitted Successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mt-4 mb-6">
      <div className="upload-header mb-4">
        <h1 className="section-title">List Your Land</h1>
        <p className="text-muted">Step {step} of 2</p>
      </div>

      <div className="card upload-card animate-fade-in text-left">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-content">
              <h3 className="mb-4">Property Details</h3>
              <div className="input-group mb-3">
                <label className="input-label">Owner Name</label>
                <input name="ownerName" type="text" className="input-field" required value={formData.ownerName} onChange={handleChange} />
              </div>

              <div className="input-group mb-3">
                <label className="input-label">Survey Number</label>
                <input name="surveyNumber" type="text" className="input-field" required value={formData.surveyNumber} onChange={handleChange} />
              </div>

              <div className="input-group mb-4">
                <label className="input-label">Land Type</label>
                <select name="landType" className="input-field" value={formData.landType} onChange={handleChange}>
                  <option value="agricultural">Agricultural</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <h3 className="mb-4 mt-4">Size & Pricing</h3>
              <div className="grid-2-col">
                <div className="input-group mb-3">
                  <label className="input-label">Total Size (in Gajam)</label>
                  <input name="gajam" type="number" className="input-field large" required value={formData.gajam} onChange={handleChange} />
                </div>
                <div className="input-group mb-3">
                  <label className="input-label">Price per Gajam (₹)</label>
                  <input name="pricePerGajam" type="number" className="input-field large" required value={formData.pricePerGajam} onChange={handleChange} />
                </div>
              </div>

              {formData.gajam && (
                <div className="conversion-box mb-4">
                  <div className="conversion-item">
                    <span>Equivalent to:</span>
                    <strong>{converted.sqYards} Sq Yards</strong>
                    <strong>{converted.acres} Acres</strong>
                  </div>
                  <div className="conversion-item highlight">
                    <span>Total Asking Price:</span>
                    <strong>₹ {converted.totalPrice.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-large w-full mt-4">
                Next: Upload Documents
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-fade-in">
              <h3 className="mb-2">Document Verification</h3>
              <p className="text-muted mb-4">Upload a clear photo or PDF of your Pattadar Passbook or Registration Document.</p>

              <div className={`upload-zone mb-4 ${uploadStatus}`}>
                <input type="file" id="docs" className="hidden" onChange={handleDocumentUpload} />
                <label htmlFor="docs" className="upload-label">
                  {uploadStatus === 'idle' && (
                    <>
                      <UploadCloud size={48} className="text-primary mb-2" />
                      <span className="btn btn-outline">Select Document</span>
                    </>
                  )}
                  {uploadStatus === 'uploading' && (
                    <div className="spinner-box">
                      <div className="spinner"></div>
                      <p className="mt-2 text-primary font-bold">AI Analyzing OCR Data...</p>
                    </div>
                  )}
                  {uploadStatus === 'verified' && (
                    <>
                      <CheckCircle size={48} className="text-success mb-2" />
                      <h4 className="text-success">Verified: Clean Title</h4>
                      <p className="text-muted text-sm mt-1">Survey #{formData.surveyNumber} matches the document.</p>
                    </>
                  )}
                  {uploadStatus === 'review' && (
                    <>
                      <AlertTriangle size={48} className="text-warning mb-2" />
                      <h4 className="text-warning">Needs Admin Review</h4>
                      <p className="text-muted text-sm mt-1">Some fields couldn't be read clearly. It will be verified manually.</p>
                    </>
                  )}
                </label>
              </div>

              <div className="flex justify-between" style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline w-full">Back</button>
                <button type="submit" disabled={uploadStatus === 'idle' || uploadStatus === 'uploading'} className="btn btn-primary w-full">
                  Post Listing
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
