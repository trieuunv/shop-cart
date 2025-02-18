<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    public function createBanner(Request $request)
    {
        $rules = [
            'image' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'target' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            $banner = Banner::create($request->only('path', 'target', 'title', 'description'));

            $path = $request->file('image')->store('banners', 'public');

            $banner->update([
                'path' => $path
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Banner added successfully',
                'banner' => $banner
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Banner add failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateBanner($id, Request $request)
    {
        $rules = [
            'image' => 'file|mimes:jpg,jpeg,png|max:2048',
            'target' => 'string',
            'title' => 'string',
            'description' => 'string',
            'status' => 'string',
            'order' => 'integer'
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        $banner = Banner::findOrFail($id);

        DB::beginTransaction();

        try {
            $banner->update($request->only('path', 'target', 'title', 'description', 'status', 'order'));

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('banners', 'public');

                $banner->update([
                    'path' => $path
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Banner updated successfully',
                'banner' => $banner
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Banner update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateBanners(Request $request)
    {
        $rules = [
            'banner_ids' => 'array',
            'banner_ids.*.id' => 'integer|exists:banners,id',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        $bannerIds = $request->input('banner_ids');

        DB::beginTransaction();

        try {
            $existingBannerIds = Banner::pluck('id')->toArray();

            $bannersToDelete = array_diff($existingBannerIds, $bannerIds);

            Banner::whereIn('id', $bannersToDelete)->delete();

            foreach ($bannerIds as $index => $bannerId) {
                Banner::where('id', $bannerId)
                    ->update(['order' => $index + 1]);
            }
    
            DB::commit();
    
            return response()->json([
                'message' => 'Banner orders updated successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
    
            return response()->json([
                'error' => 'An error occurred while updating banner orders',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function showBanners()
    {
        $banners = Banner::orderBy('order', 'asc')->get();
        return response()->json([
            'banners' => $banners
        ], 200);
    }
}
