import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (links.length <= 3) return null; // kalau cuma 1 halaman, ga usah tampil

    return (
        <div className="flex items-center justify-between mt-6">
            {/* Prev */}
            <div>
                {links[0].url ? (
                    <Link
                        href={links[0].url}
                        dangerouslySetInnerHTML={{ __html: links[0].label }}
                        className="px-3 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100"
                    />
                ) : (
                    <span
                        dangerouslySetInnerHTML={{ __html: links[0].label }}
                        className="px-3 py-2 mr-2 text-sm font-medium text-gray-400 bg-gray-100 border rounded-lg cursor-not-allowed"
                    />
                )}
            </div>

            {/* Numbered pages */}
            <div className="flex items-center space-x-1">
                {links.slice(1, -1).map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-2 text-sm font-medium border rounded-lg transition ${
                            link.active
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    />
                ))}
            </div>

            {/* Next */}
            <div>
                {links[links.length - 1].url ? (
                    <Link
                        href={links[links.length - 1].url}
                        dangerouslySetInnerHTML={{
                            __html: links[links.length - 1].label,
                        }}
                        className="px-3 py-2 ml-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100"
                    />
                ) : (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: links[links.length - 1].label,
                        }}
                        className="px-3 py-2 ml-2 text-sm font-medium text-gray-400 bg-gray-100 border rounded-lg cursor-not-allowed"
                    />
                )}
            </div>
        </div>
    );
}
