import React from 'react';
import { Award, Calendar, Shield, ExternalLink } from 'lucide-react';
import { Certificate } from '../../types';

interface CertificateViewerProps {
  certificate: Certificate;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-dark-secondary rounded-xl shadow-lg border-2 border-purple-600/50 overflow-hidden glass glow-purple">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center glow-blue">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Certificate of Completion</h2>
              <p className="text-purple-100">EduChain</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 text-green-300">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            This is to certify that
          </h3>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {certificate.studentName}
          </div>
          <p className="text-lg text-gray-300">
            has successfully completed the course
          </p>
          <h4 className="text-xl font-bold text-white mt-2">
            {certificate.courseName}
          </h4>
        </div>

        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="text-center">
            <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Completion Date</p>
            <p className="font-semibold text-white">{formatDate(certificate.completionDate)}</p>
          </div>
          <div className="text-center">
            <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Verification Status</p>
            <p className="font-semibold text-green-600">
              {certificate.verified ? 'Verified' : 'Pending'}
            </p>
          </div>
        </div>

        <div className="bg-dark-tertiary rounded-lg p-4 mb-6 border border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Blockchain Hash</p>
              <p className="font-mono text-sm text-gray-300">
                {certificate.onChainHash}
              </p>
            </div>
            <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors glow-blue">
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">View on Explorer</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full glow-purple">
            <span className="text-sm font-medium">Powered by Shardeum</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;